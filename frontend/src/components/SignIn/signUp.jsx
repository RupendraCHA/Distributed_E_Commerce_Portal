import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist"
import { IoInformationCircleOutline } from "react-icons/io5";
import axios from 'axios';
import './signIn.css';


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [passwordRules, setRules] = useState(false)

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

    const showPasswordRules = () => {
        if (passwordRules === false) {
            setRules(true)
        }else {
            setRules(false)
        }
    }

    return (
        <div className='container bg-container-signup d-flex justify-content-center align-items-center vh-screen bg-gradient-to-r from-[#86d3e3] to-[#506bf2]'>
            <div className='h-full border-6 border-[#0B0B0B]-600 overflow-auto bg-[#2d313b] w-[30vw] m-6 p-8 rounded-4 flex flex-col justify-center items-center' style={{opacity: 0.9}}>
            {/* bg-[#B8E3E0] */}
                <div className='text-black w-[100%]'>
                    <h2 className='font-bold text-center text-white w-100 bg-[#497cf2] text-3xl p-2 mb-4'>Registeration Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 bg-[#fff] px-2 py-1 rounded-2'>
                            <label htmlFor='name'>
                                <strong>Name</strong>
                            </label>
                            <input
                                type='text'
                                placeholder='Enter Name'
                                autoComplete='off'
                                name='name'
                                className='rounded-2 outline-none form-control font-[500] register-user-input border-3'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <p className='error'>{errors.name}</p>}
                        </div> 
                        <div className='mb-3 bg-[#fff] px-2 py-1 rounded-2'>
                            <label htmlFor='email'>
                                <strong>Email</strong>
                            </label>
                            <input
                                type='text'
                                placeholder='Enter email address'
                                autoComplete='off'
                                name='email'
                                className='rounded-2 outline-none form-control font-[500] register-user-input border-3'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                        </div>
                        <div className='mb-3 bg-[#fff] px-2 py-1 rounded-2'>
                            <label htmlFor='password'>
                                <strong>Password</strong>
                            </label>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                autoComplete='off'
                                name='password'
                                className='border-3 outline-none rounded-2 font-[500] form-control register-user-input'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mb-3 bg-[#fff] px-2 py-1 rounded-2'>
                            <label htmlFor='confirmPassword'>
                                <strong>Confirm Password</strong>
                            </label>
                            <input
                                type='password'
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                autoComplete='off'
                                name='confirmPassword'
                                className='border-3 outline-solid border-[#000]-600 rounded-2 font-[500] form-control register-user-input'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {errors.password && <p className='error'>{errors.password}</p>}
                        <div className='text-white font-bold flex flex-row justify-start items-center gap-1 cursor-pointer' onClick={showPasswordRules}>
                            <IoInformationCircleOutline className='w-[20px] h-[20px]'/>
                            <p>See Password Requirements</p>
                        </div>
                        {passwordRules && <div className='bg-black overflow-auto p-4'>
                            <PasswordChecklist
                                    style={{opacity: 0.9}}
                                    className='text-red-900 font-[600] text-[14px] bg-white rounded-4 px-4 py-2'
                                    rules={["minLength","specialChar","number","capital","match", "lowercase"]}
                                    minLength={8}
                                    value={password}
                                    valueAgain={confirmPassword}
                                    // onChange={(isValid) => {}}
                                />
                        </div>}
                        <div className='bg-[#3B53C1] text-white p-3 mt-3 rounded-2'>
                            <div className='checkbox-container'>
                                <input type='checkbox' required className='checkbox' />
                                <p>I accept terms & conditions.</p>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-default hover:bg-[#000] hover:text-white bg-[#fff] w-100 rounded-0'
                                style={{ fontWeight: '600' }}
                            >
                                Register
                            </button>
                            <p className='font-bold mt-3'>Already have an account?</p>
                            <Link
                                to='/login'
                                className='btn btn-default hover:bg-[#000] hover:text-white bg-[#fff] w-100 rounded-0'
                                style={{ fontWeight: '600' }}
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                   
                </div>
                
            </div>
        </div>
    );
}

export default SignUp;
