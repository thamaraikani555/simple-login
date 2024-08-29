import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { saveNewUser, getUsers } from "../store/slice/user";

const Register = () => {

    const currentURL = window.location.href;
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});

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

        const newErrors = {};
        if (!formData.firstName) {
            newErrors.firstName = "First name is required.";
        }
    
        if (!formData.lastName) {
            newErrors.lastName = "Last name is required.";
        }
    
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid.";
        }
    
        if (!formData.mobileNo) {
            newErrors.mobileNo = "Phone number is required.";
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            newErrors.mobileNo = "Phone number is invalid.";
        }
    
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setButton(false);
            return;
        }

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
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputname" className="form-label">
                                <strong >First Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter First Name"
                                className="form-control" 
                                id="exampleInputname"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            /> 
                            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="lastName" className="form-label">
                                <strong >Last Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Last Name"
                                className="form-control" 
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            /> 
                            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                        </div>
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
                            <label htmlFor="mobileNo" className="form-label">
                                <strong>Phone Number</strong>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter Phone Number"
                                className="form-control" 
                                id="mobileNo" 
                                value={formData.mobileNo}
                                onChange={handleChange}
                                name="mobileNo"
                            /> 
                            {errors.mobileNo && <div className="text-danger">{errors.mobileNo}</div>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="role" className="form-label">
                                <strong>Role</strong>
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="form-control"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Guest">Guest</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="password" 
                                value={formData.password}
                                onChange={handleChange}
                                 name="password"
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2' style={{ textAlign: "right"}} >Already have an account ? <Link to='/login'>Login</Link></p>
                    
                </div>
            </div>
        </div>
    )
}

export default Register