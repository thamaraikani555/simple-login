import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Register from './Register';
import { saveNewUser } from '../store/slice/user';

jest.mock('../store/slice/user', () => ({
  saveNewUser: jest.fn(() => ({ type: 'user/saveNewUser' }))
}));

const mockStore = configureStore([]);
const history = createMemoryHistory();

describe('Register Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('renders Register form', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Register />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Id')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('shows validation messages on form submission with empty fields', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Register />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Register'));

    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(screen.getByText('Last name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Phone number is required.')).toBeInTheDocument();
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
  });

  test('shows validation message for invalid email format', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Register />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Email Id'), { target: { value: 'invalidEmail' } });
    fireEvent.click(screen.getByText('Register'));

    expect(await screen.findByText('Email is invalid.')).toBeInTheDocument();
  });

  test('shows validation message for invalid phone number format', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Register />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Register'));

    expect(await screen.findByText('Phone number must be exactly 10 digits.')).toBeInTheDocument();
  });

  test('calls saveNewUser on valid form submission', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Register />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email Id'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Register'));

    expect(saveNewUser).toHaveBeenCalledWith(expect.objectContaining({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobileNo: '1234567890',
      password: 'password'
    }), expect.anything());
  });
});
