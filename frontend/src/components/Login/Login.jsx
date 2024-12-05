import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, setToken } from '../../store/authSlice';
import './logIn.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [failed, setFailed] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        if (!email.trim() || !validateEmail(email)) {
            formErrors.email = 'Please enter a valid email address';
        }

        if (!password || !validatePassword(password)) {
            formErrors.password =
                'Password must be at least 8 characters, include 1 letter, 1 symbol, and 1 number';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            axios
                .post('http://localhost:3002/login', { email, password })
                .then((result) => {
                    if (result.data.message === 'Success') {
                        dispatch(login());
                        dispatch(setToken(result.data.token));
                        navigate('/');
                    } else {
                        setFailed('Invalid email or password');
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setFailed('An error occurred. Please try again.');
                });
        }
    };

    return (
        <div className='bg-container-login d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div
                className='bg-secondary p-4 text-white rounded-4 login-card'
                style={{ opacity: '0.9' }}
            >
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter login address'
                            autoComplete='off'
                            name='email'
                            required
                            className='rounded-0 form-control login-user-input'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className='error'>{errors.email}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            required
                            name='password'
                            className='rounded-0 form-control login-user-input'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className='error'>{errors.password}</p>}
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary bg-primary w-100 rounded-0'
                        style={{ fontWeight: '600' }}
                    >
                        Login
                    </button>
                </form>
                {failed && <p className='text-danger mt-3'>{failed}</p>}
                <p className='mt-3'>Don't have an account?</p>
                <Link
                    to='/register'
                    className='btn btn-default border w-100 bg-warning rounded-0 text-decoration-none'
                    style={{ fontWeight: '600' }}
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
