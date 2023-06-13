import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin =(event) => {
        event.preventDefault();
        axios.post('http://localhost:8800/login', {email,password})
        .then(res => {
            props.authUser(res.data);
            navigate("/home");
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="login-container">
        <div className="container">
            <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center fw-bold">Login</h1>
                    <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="login_email" value={email} onChange={handleEmail} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="login_password" value={password} onChange={handlePassword} required/>
                    </div>
                    <div className="d-flex flex-row justify-content-between my-3">
                        <div><NavLink className="text-decoration-none bg-success text-light p-1 fw-bold rounded" to="/register">Create New Account</NavLink></div>
                        <div><a className="text-decoration-none bg-secondary text-light p-1 fw-bold rounded" href="/">Forgot Password?</a></div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

Login.protoTypes = {
    authUser: PropTypes.func,
}

export default Login;