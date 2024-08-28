import React, { useState, useEffect } from "react";
import '../css/FormStyles.css'; 
import { saveNewUser, getUsers } from "../store/slice/user";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';


const Signup = () => {

    const currentURL = window.location.href;
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        role: 'User',
        password: ''
    });
    const [formValidationError, setFormValidation] = useState(true);
    const [isButtondisabled, setButton] = useState(false)

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setButton(true)
        setTimeout(() => { setButton(false)}, 3000)
        let response = await dispatch( saveNewUser({...formData}), history );
        if(response){
            await setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobileNo: '',
                role: 'User',
                password: ''
            })
            history.push('/login');
        }
    };

    return (
        <div className="form-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mobile No:</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Guest">Guest</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
