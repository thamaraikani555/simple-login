import React, { useState, useEffect } from 'react';
import '../css/FormStyles.css'; 
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/slice/user";

const UserList = () => {

    const { userList } = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        getallUser();           
    },[]);   

    const getallUser = async () => {
        await dispatch( getUsers() );
    }
    
    return (
        <div className="form-container">
            <h2>User List</h2>
            <ul>
                {userList && userList.map(user => (
                    <li key={user._id}>{user.firstName} {user.lastName} - {user.role}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
