import React, { useState, useEffect, useCallback } from "react";
import '../css/login.css'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loginMethod } from "../store/slice/auth"
import { Link } from 'react-router-dom';


const LoginForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setData] =  useState({ email: '', password: '' });
    const [formValidationError, setFormValidation] = useState(true);
    const [errors, setErrors] = useState({ email: ''});
  
    const authToken = localStorage.getItem('authToken');
    const handleChange = async (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        await setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {};
        if (!formData.email) {
          newErrors.email = 'User Name is required';
          setFormValidation(false)
        }else {
          setFormValidation(true)
        }
    
        if (!formData.password) {
          newErrors.password = 'Password is required';
          setFormValidation(false)
        }else {
          setFormValidation(true)
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) { 
            await dispatch( loginMethod(formData, history));
            history.push('/users');
        }
    
    }
    

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit} className="login-form" method="post">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <Link to="/signup" className="text-link">
                        <div className="text">Create New User</div>
                    </Link>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
