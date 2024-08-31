import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login';
import { loginMethod } from '../store/slice/auth';

jest.mock('../store/slice/auth', () => ({
  loginMethod: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({});
    history = createMemoryHistory();
  });

  it('renders the login form with email and password fields', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted with empty fields', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Login/i));

    expect(await screen.findByText(/User Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

  it('calls loginMethod and redirects to /users when form is submitted with valid data', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Email/i), {
      target: { value: 'test@example.com', name: 'email' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: 'password123', name: 'password' },
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(loginMethod).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.any(Object) // history object
      );
      expect(history.location.pathname).toBe('/users');
    });
  });

  it('does not redirect when validation fails', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(loginMethod).not.toHaveBeenCalled();
      expect(history.location.pathname).toBe('/');
    });
  });
});
