import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserProfile from '../components/UserProfile';
import { getUserById } from '../store/slice/user';

jest.mock('../store/slice/user', () => ({
    getUserById: jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe('UserProfile Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: {
                singleUser: {
                    _id: '1',
                    firstName: 'Thamarai',
                    lastName: 'Kani',
                    role: 'Admin',
                    email: 'kani@mailinator.com',
                    mobileNo: '7904030415',
                },
            },
        });
        getUserById.mockResolvedValue({});
    });

    test('renders UserProfile component correctly', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/user/1']}>
                    <Route path="/user/:userId">
                        <UserProfile />
                    </Route>
                </MemoryRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('dispatches getUserById on component mount', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/user/1']}>
                    <Route path="/user/:userId">
                        <UserProfile />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        expect(getUserById).toHaveBeenCalledWith('1');
    });

    test('displays user profile information after data is fetched', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/user/1']}>
                    <Route path="/user/:userId">
                        <UserProfile />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Thamarai Kani')).toBeInTheDocument();
            expect(screen.getByText('kani@mailinator.com')).toBeInTheDocument();
            expect(screen.getByText('Admin')).toBeInTheDocument();
            expect(screen.getByText('7904030415')).toBeInTheDocument();
        });
    });

    test('shows loading indicator while fetching data', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/user/1']}>
                    <Route path="/user/:userId">
                        <UserProfile />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('displays error message if there is an error fetching user data', async () => {
        getUserById.mockRejectedValueOnce(new Error('Failed to fetch user data'));
        
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/user/1']}>
                    <Route path="/user/:userId">
                        <UserProfile />
                    </Route>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('There was an error fetching the user data!')).toBeInTheDocument();
        });
    });
});
