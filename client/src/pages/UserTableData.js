import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/slice/user";
import Header from "./Header";
import '../css/userList.css';
import { useHistory } from 'react-router-dom';

const UserList = () => {
    const { userList, totalCount } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState(""); // For role filtering

    useEffect(() => {
        fetchUsers(currentPage, perPage);
    }, [currentPage, perPage]);

    const fetchUsers = async (page, limit) => {
        setLoading(true);
        await dispatch(getUsers(page, limit));
        setLoading(false);
    };

    useEffect(() => {
        filterUsers();
    }, [searchQuery, selectedRole, userList]);

    const filterUsers = () => {
        let filtered = userList;

        if (searchQuery) {
            filtered = filtered.filter(user =>
                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.mobileNo.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedRole) {
            filtered = filtered.filter(user => user.role === selectedRole);
        }

        setFilteredUsers(filtered);
    };

    const handleRowClick = (row) => {
        history.push(`/user/${row._id}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = (newPerPage, page) => {
        setPerPage(newPerPage);
        setCurrentPage(page); 
    };

    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.mobileNo,
            sortable: true,
        },
    ];

    return (
        <div className="form-container" style={{ width: '90%', margin: '10px auto', height: "95vh" }}>
            <Header />
            <h2>User List</h2>
            <DataTable
                columns={columns}
                data={filteredUsers}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalCount}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onRowClicked={handleRowClick} 
                subHeader
                subHeaderComponent={
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            placeholder="Search by any field"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="role-filter"
                        >
                            <option value="">All Roles</option>
                            {Array.from(new Set(userList.map(user => user.role))).map((role, index) => (
                                <option key={index} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                }
                paginationComponentOptions={{
                    rowsPerPageText: 'Rows per page:',
                    rangeSeparatorText: 'of',
                }}
            />
        </div>
    );
};

export default UserList;
