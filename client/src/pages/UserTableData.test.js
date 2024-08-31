import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserList from '../components/UserList';
import { getUsers } from '../store/slice/user';

jest.mock('../store/slice/user', () => ({
    getUsers: jest.fn(),
}));

const mockStore = configureStore([thunk]);

describe('UserList Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: {
                userList: [
                    { _id: '1', firstName: 'John', lastName: 'Doe', role: 'Admin', email: 'john.doe@example.com', mobileNo: '1234567890' },
                    { _id: '2', firstName: 'Jane', lastName: 'Doe', role: 'User', email: 'jane.doe@example.com', mobileNo: '0987654321' }
                ],
                totalCount: 2,
            },
        });
        getUsers.mockResolvedValue([]);
    });

    test('renders UserList component correctly', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserList />
                </MemoryRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('dispatches getUsers on component mount', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserList />
                </MemoryRouter>
            </Provider>
        );

        expect(getUsers).toHaveBeenCalled();
    });

    test('displays users in the table', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserList />
                </MemoryRouter>
            </Provider>
        );

        const rows = await screen.findAllByRole('row');
        expect(rows.length).toBe(3); // Including the header row
    });

    test('filters users by search query', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserList />
                </MemoryRouter>
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search by any field');
        fireEvent.change(searchInput, { target: { value: 'Jane' } });

        await waitFor(() => {
            const rows = screen.getAllByRole('row');
            expect(rows.length).toBe(2); // Including the header row
            expect(screen.getByText('Jane')).toBeInTheDocument();
        });
    });

    test('filters users by role', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserList />
                </MemoryRouter>
            </Provider>
        );

        const roleSelect = screen.getByRole('combobox');
        fireEvent.change(roleSelect, { target: { value: 'Admin' } });

        await waitFor(() => {
            const rows = screen.getAllByRole('row');
            expect(rows.length).toBe(2); // Including the header row
            expect(screen.getByText('Admin')).toBeInTheDocument();
        });
    });

    test('navigates to user details on row click', async () => {
        const history = { push: jest.fn() };
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <UserList />
                </MemoryRouter>
            </Provider>
        );

        const row = screen.getByText('John');
        fireEvent.click(row);

        await waitFor(() => {
            expect(history.push).toHaveBeenCalledWith('/user/1');
        });
    });
});
