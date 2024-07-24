import { useGoogleLogin } from '@react-oauth/google';
import Button from './Button';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API_URL } from '../utils/API';
import { loginUser, setUser } from '../redux/slices/authSlice';

const CustomGoogleLogin = ({label}) => {
const dispatch=useDispatch()
const navigate=useNavigate()
 const handleLoginSuccess = async (response) => {
    const accessToken = response.access_token;
    
    try {
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if(userInfoResponse.status===200){
        const user = userInfoResponse.data;
        try {
         const {data} =await axios.post(`${API_URL}/auth/google/client`,{
          sub: user.sub,
          name: user.name,
          email: user.email,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        } );
            dispatch(loginUser({ user: data.user, isAuthenticated: true, accessToken: data.accessToken }));
            navigate('/jobs')
            
        } catch (error) {
          console.error('Error logging in with Google:', error);
        }}
    } catch (error) {
      console.error('Error fetching user info:', error); 
    }
  };

  const handleLoginError = (error) => {
    toast.error('Login Failed')
    console.error('Login Failed:', error);
  };


  const login = useGoogleLogin({
    onSuccess: credentialResponse => handleLoginSuccess(credentialResponse),
    onError: error => handleLoginError(error),
  });

  return (
    <div className='mt-3'>
      <Button icon={FcGoogle} label={label} outline onClick={()=>{login()}}/>
    </div>
  );
};

export default CustomGoogleLogin;