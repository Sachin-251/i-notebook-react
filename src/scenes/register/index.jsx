import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Register = (props) => {
    const [fName,setFName] = useState('');
    const [lName,setLName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] =  useState('');
    const [cPassword,setCPassword] = useState('');
    const navigate = useNavigate();
    
    const handleFName = (event) => {
        setFName(event.target.value);
    }
    const handleLName = (event) => {
        setLName(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleCPassword = (event) => {
        setCPassword(event.target.value);
    }

    const validateValues = () => {
        if(cPassword !== password){
            document.getElementById('confirm-password').style.borderColor = "red";
            document.getElementById('btn-signup').disabled = true;
        }else{
            document.getElementById('confirm-password').style.borderColor = "";
            document.getElementById('btn-signup').disabled = false;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:8800/user', {email})
        .then(res => {
            if(res.data){
                console.log(res);
                document.getElementById('email-alert').style.display = "";
                setTimeout(() => {
                    document.getElementById('email-alert').style.display = "none";
                }, 3000);
            }else{
                axios.post('http://localhost:8800/register', {fName,lName,email,password})
                .then(res => console.log(res))
                .catch(err => console.log(err));
                navigate("/");
            }
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
                    <h1 className="card-title text-center fw-bold">Sign Up</h1>
                    <div className='text-center text-light bg-danger rounded h5 fw-bold m-2 p-1' id="email-alert" style={{display: 'none'}}>Email already registered!!!</div>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" value={fName} onChange={handleFName} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" value={lName} onChange={handleLName} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={handlePassword} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm-password" value={cPassword} onBlur={validateValues} onChange={handleCPassword} required/>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" id="btn-signup">Sign Up</button>
                    </div>
                    <p className="text-center mt-3">Already have an account? <NavLink className="text-decoration-none bg-success text-light p-1 fw-bold rounded" to="/">Login</NavLink></p>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

    );
}

export default Register;