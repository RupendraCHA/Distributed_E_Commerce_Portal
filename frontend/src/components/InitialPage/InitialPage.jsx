import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./initialPage.css";

function InitialPage() {
  // Accessing the logged-in state from the Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.user?.role);

  console.log({isLoggedIn})
    if (isLoggedIn) {
        return ( 
        <div className='container flex justify-around items-center gap-30 bg-gradient-to-r from-[#86d3e3] to-[#506bf2] p-3 h-screen'>
            <div className='flex justify-around items-center gap-30'>
              <div className='flex gap-5 flex-col justify-start align-start text-white ml-4'>
                <h3 className="text-5xl underline font-semibold">Welcome to POSETRA.</h3>
                <h4 className="text-2xl font-semibold">
                  Browse our collection, find what you love, and enjoy a smooth shopping experience from start to finish.
                </h4>
                <div>
                  <Link to=
                  {userRole === "user" ? "/distributors/products"
                    :
                  "/products"}><button className="hover:bg-red-700  text-xl border-2 border-solid py-3 px-5 rounded-2">Shop Now</button></Link>
                </div>
              </div>
              <img src="https://res.cloudinary.com/dppznstlh/image/upload/v1733338071/cart_2_pmbksp.png" className='initial-image' alt="POSETRA Home PAGE"/>
            </div>
        </div>)
    }
  return (
    <div className='container g-[40px] p-5 flex justify-around items-center min-h-[60vh] bg-gradient-to-r from-[#86d3e3] to-[#506bf2]'>
      {/* bg-gradient-to-r from-[#72edf2] via-[blue] to-[#72edf2] */}
      {!isLoggedIn && (
        <div className='flex flex-col justify-around items-center text-center h-[80vh] mr-40 px-4 py-8'>
          <div className='signup-button bg-[#fff] px-4 py-6 text-[#002C54]-600 rounded-md'>
              <h3 className='text-3xl mb-2 font-play font-semibold'>New here, click to register...</h3>
              <Link to="/register">
                <button className='font-xl text-[#fff] bg-[#002C54] border-none px-6 py-2 rounded-2 font-semibold'>
                  Register
                </button>
              </Link>
          </div>
          <div className='signup-button bg-gray-600 px-4 py-6 text-white rounded-md'>
              <h3 className='text-3xl mb-2 font-play font-semibold'>Already have an account? Click to Login...</h3>
              <Link to="/login">
                <button className='font-xl text-[#002C54] bg-[#fff] border-none px-6 py-2 rounded-2 font-semibold'>
                  Login
                </button>
              </Link>
          </div>
        </div>
        )}
      <div>
        {/* <img src='https://res.cloudinary.com/dvxkeeeqs/image/upload/v1731494619/CredentialsPageImage_yf4eu6.jpg' alt='CredentialsImage' className='credentials-image'/> */}
        <img src="https://res.cloudinary.com/dppznstlh/image/upload/v1733338071/cart_2_pmbksp.png" className='credentials-image' alt='RegisterPage'/>
      </div>
    </div>
  );
}

export default InitialPage;
