import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../store/slice/user";
import "../css/UserProfile.css"

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const { singleUser } = useSelector((state) => state.user);

    useEffect(() => {       
        fetchUser();
    }, [userId]);

    const fetchUser = async () => {
        try {
            await dispatch(getUserById(userId));
        } catch (error) {
            console.error("There was an error fetching the user data!", error);
        }
    };

    useEffect(() => {       
        setUser(singleUser);
    }, [singleUser]);

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <div className="user-profile-container">
            <div className="user-profile-card">
                <h2 className="user-name">{user.firstName} {user.lastName}</h2>
                <div className="user-info">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Phone:</strong> {user.mobileNo}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
