import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, loginUser } from '../redux/slices/authSlice';
import { login, googleLogin } from '../services/authService.jsx';
import Input from '../components/Input.jsx';
import { FcGoogle } from "react-icons/fc";
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLoginbtn.jsx'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated &&  user) {
      dispatch(fetchCurrentUser()).then((fetchedUser) => {
        if (fetchedUser.payload.initial_login === true) {
          navigate('/onboarding');
        } else {
          navigate('/');
        }
      });
    }
  }, [isAuthenticated, status, user, dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const { accessToken, refreshToken, user } = response;
      dispatch(loginUser({ accessToken, refreshToken, user }));
      toast.success("Successfully logged in");
      

    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
    }
    
    
  };

   const handleGoogleLogin = async () => {
    try {
      // const tokenId = googleUser.getAuthResponse().id_token;
      const  gresponse= await googleLogin();
     // dispatch(loginUser(accessToken));
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

 
  return (
    <section className='relative w-full bg-fuchsia-100 py-20 min-h-screen'>
    <div className="max-w-2xl sm:mx-auto mx-3 px-4 shadow-sm bg-white py-6 rounded-md">
      <div className='mx-6 md:mx-12 my-8'>
      <form onSubmit={handleLogin}>
        <h2 className='text-3xl font-bold text-center text-fuchsia-800 mb-10'>Login</h2>
      <Input
        label={"Email"}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={"Password"}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="text-center">
        <button className='text-white bg-fuchsia-600 py-2 px-6 w-full mt-3 font-bold
         border-solid border-2 border-fuchsia-700 hover:opacity-80
        rounded-md' type="submit">Login</button>
        </div>  
    </form>

    {/* <Button icon={FcGoogle} label={"Login with google"} 
        onClick={() => {handleGoogleLogin()}} outline/> */}
      <GoogleLogin label={"Login with Google"}/>
      <div className="text-sm my-2">Don't have an account?</div>
      <Button label={"Register"} onClick={()=>{navigate('/signup')}}/>
        
        
      </div>
    </div>
    </section>
  );
};

export default Login;

