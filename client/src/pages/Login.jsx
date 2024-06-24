import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { login, googleLogin } from '../services/authService.jsx';
import Input from '../components/Input.jsx';
import { FcGoogle } from "react-icons/fc";
import Button from '../components/Button.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      dispatch(loginUser(token));
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async (googleUser) => {
    try {
      const tokenId = googleUser.getAuthResponse().id_token;
      const { token } = await googleLogin(tokenId);
      dispatch(loginUser(token));
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

    <Button icon={FcGoogle} label={"Login with google"} 
        onClick={() => signIn('google')} outline/>
      <div className="text-sm my-2">Don't have an account?</div>
      <Button label={"Register"} onClick={()=>{navigate('/signup')}}/>
      </div>
    </div>
    </section>
  );
};

export default Login;

