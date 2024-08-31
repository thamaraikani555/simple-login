import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ResponsiveHeader from './ResponsiveHeader';

describe('ResponsiveHeader Component', () => {
  it('renders the header with back and logout buttons', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ResponsiveHeader />
      </Router>
    );

    expect(screen.getByText(/Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('calls history.goBack when back button is clicked', () => {
    const history = createMemoryHistory();
    history.push('/some-page');
    render(
      <Router history={history}>
        <ResponsiveHeader />
      </Router>
    );

    fireEvent.click(screen.getByText(/Back/i));
    expect(history.length).toBe(1);
  });

  it('removes authToken and redirects to login when logout is clicked', () => {
    localStorage.setItem('authToken', 'dummy-token');
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ResponsiveHeader />
      </Router>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(history.location.pathname).toBe('/login');
  });

  it('toggles mobile menu when toggle button is clicked', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ResponsiveHeader />
      </Router>
    );

    const toggleButton = screen.getByText('☰');
    fireEvent.click(toggleButton);
    expect(screen.getByRole('navigation')).toHaveClass('header__nav--open');
  });
});
