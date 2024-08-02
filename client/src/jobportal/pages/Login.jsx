import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, loginUser } from '../redux/slices/authSlice.js';
import { login} from '../services/authService.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/ui/GoogleLoginbtn.jsx'
import { toast } from 'react-toastify';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated &&  user) {
      dispatch(fetchCurrentUser()).then((fetchedUser) => {
        if(fetchedUser.payload.role === 'admin'){
          navigate('/admin/dashboard')
        }
        if(fetchedUser.payload.isAdmin === false){
        if (fetchedUser.payload.initial_login === true) {
          navigate('/onboarding');
        } else {
          navigate('/jobs');
        }}
      });
    }
  }, [isAuthenticated, user, dispatch, navigate]);

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
      <GoogleLogin label={"Login with Google"}/>
      <div className="text-sm my-3">Don't have an account?</div>
      <Button label={"Register"} onClick={()=>{navigate('/signup')}}/>
        
        
      </div>
    </div>
    </section>
  );
};

export default Login;

