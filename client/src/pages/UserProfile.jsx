import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, logoutUser } from '../redux/slices/authSlice';
import Button from '../components/Button';
import { FaRegEdit } from 'react-icons/fa';
import { openModal } from '../redux/slices/modalSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && status === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated, status]);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  if (status === 'loading') {
    return <div>Loading user data...</div>;
  }


  return (
    <section className='relative w-full bg-fuchsia-100 py-14 min-h-screen'>
    
        <div className="max-w-5xl sm:mx-auto mx-3 md:px-8 px-2 shadow-sm bg-white py-6 rounded-md">  
        
      <h2 className='text-2xl font-bold text-center text-fuchsia-800 mb-4'>{user.name}</h2>
      <div className="flex justify-between items-center">
      <div className="space-y-1">
      <p className='text-md text-gray-600 font-semibold'>Profile details:</p>
      <div className='text-sm text-gray-600 space-y-2'>
        <p>User name : {user.name}</p>
        <p>User email : {user.email}</p>
        <p>User phone : {user.phoneno?user.phone.no:"not found"}</p>
        <p>Phone verified: {user.phone_verified ?<>
        {user.phone_verified===true?"Verified":<>("not verified ")</>}</>
          :"not verified"}</p>
         <p> User Type : <>{user.role}</></p>
         <Button outline small label={"Update profile"} icon={FaRegEdit} onClick={()=>{dispatch(openModal('updateProfile'))}}/>
      </div>
      </div>
      {/* sidepart */}
      <div className="px-6 py-4 bg-fuchsia-100 rounded-md">
        <div className='mx-auto w-16 my-2'><img className="rounded-full" src='/public/avatar.jpg'/></div>
        <hr />
        <div className="mx-auto space-y-2 mt-3">
         
        <div className='flex justify-between items-center space-x-6'>
           <div>Phone-no : </div>
           <div className='text-fuchsia-700 font-thin'>{user.phone_verified?"verified":
           (<Button small outline label={"verify"} onClick={()=>{dispatch(openModal('verifyPhone'))}}/>)}</div>
        </div>
        <div className='flex justify-between items-center space-x-6'>
        <div>Edit user :</div><div><Button outline small label={user.role} 
        onClick={()=>{dispatch(openModal('employer'))}} /></div>
        </div>
        </div>
      </div></div>
    </div>
        
    </section>
  );
};

export default UserProfile;