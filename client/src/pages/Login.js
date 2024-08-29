import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { loginMethod } from "../store/slice/auth"
const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setData] =  useState({ email: '', password: '' });
    const [formValidationError, setFormValidation] = useState(true);
    const [errors, setErrors] = useState({});
  
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
        <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
            <div className="bg-white p-3 rounded" style={{ width: "40%"}}>
                <h2 className='mb-3 text-primary'>Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            <strong>Email Id</strong>
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        /> 
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="exampleInputPassword1" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {/* TO add ' appostopee */}
                <p className='container my-2' style={{ textAlign: "right"}}>Don&apos;t have an account? <Link to='/signup' className="">Register</Link></p>
                
            </div>
        </div>
    )
}

export default Login