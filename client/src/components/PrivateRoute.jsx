import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const PrivateRoute = ({ children}) => {
  
  const { user,isAuthenticated } = useSelector((state) => state.auth);
  if(user){
   return children
  }
  if (!isAuthenticated) {
    return <div className='text-bold text-red-400 m-5'>Please login !!</div>;
  }
  return(toast.error("Please login to continue"))
    
};

export default PrivateRoute;