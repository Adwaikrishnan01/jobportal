import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    toast.error("Please login to continue");
    return <Navigate to="/login" replace />;
  }

  if (user) {
    
    if (adminOnly && !user.isAdmin) {
      toast.error("Access denied. Admin only.");
      return <Navigate to="/jobs" replace />;
    }
    

    if (adminOnly && user.isAdmin) {
      return children; 
    }
    return children;
  }

  return <div className='text-bold text-red-400 m-5'>Please login !!</div>;
};

export default PrivateRoute;