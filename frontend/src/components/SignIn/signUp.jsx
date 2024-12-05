import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signIn.css';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = {};

        if (!name.trim()) {
            formErrors.name = 'Name is required';
        }

        if (!email.trim() || !validateEmail(email)) {
            formErrors.email = 'Please enter a valid email address';
        }

        if (!password || !validatePassword(password)) {
            formErrors.password = 'Password must be at least 8 characters, include 1 letter, 1 symbol, and 1 number';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            axios.post('http://localhost:3002/register', { name, email, password })
            .then(result => {
                console.log(result)
                navigate("/login")
            })
            .catch(err => console.log(err))
        }
    };

    return (
        <div className='bg-container-signup d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-black p-4 rounded-4 register-card' style={{ opacity: '0.8' }}>
                <h2 className='text-white'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 text-white'>
                        <label htmlFor='name'>
                            <strong>Name</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='name'
                            className='rounded-0 form-control register-user-input'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className='error'>{errors.name}</p>}
                    </div>
                    <div className='mb-3 text-white'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter email address'
                            autoComplete='off'
                            name='email'
                            className='rounded-0 form-control register-user-input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className='error'>{errors.email}</p>}
                    </div>
                    <div className='mb-3 text-white'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='rounded-0 form-control register-user-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                    <div className='checkbox-container'>
                        <input type='checkbox' required className='checkbox' />
                        <p>I accept terms & conditions.</p>
                    </div>
                    <button
                        type='submit'
                        className='btn btn-warning w-100 rounded-0'
                        style={{ fontWeight: '600' }}
                    >
                        Register
                    </button>
                </form>
                <p className='text-white'>Already have an account?</p>
                <Link
                    to='/login'
                    className='btn btn-default border w-100 bg-success rounded-0 text-decoration-none'
                    style={{ fontWeight: '600' }}
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default SignUp;
