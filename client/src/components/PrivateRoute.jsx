import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ children}) => {
  const navigate=useNavigate()
  const { user,isAuthenticated } = useSelector((state) => state.auth);
  if(!user){
    useEffect(()=>{
      toast('Please login to continue');
      navigate('/login') 
    },[])
  }
  else{
    return children
  }
};

export default PrivateRoute;