import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, logoutUser } from '../redux/slices/authSlice';
import Button from '../components/ui/Button';
import { FaRegEdit } from 'react-icons/fa';
import { openModal } from '../redux/slices/modalSlice';
import { toast } from 'react-toastify';
import axios from '../utils/AxiosConfig'
import UserJobView from '../components/cards/UserJobView';
import ResumeUpload from '../components/ResumeUpload';
import { handleDownloadResume } from '../actions/Actions';

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
const handleVerify=async()=>{
  const phone=user.phone
   if(!phone){
    toast.info('Please add phone no')
   }
   if(user?.phone_verified){
    toast.success('Your phone no is already verified')
   }
   if(!user.phone_verified){
    try{
      const response=await axios.post('/verifyrequest',{phone})
      if (response.status === 200) {
        dispatch(openModal('verifyPhone'))
        toast.success("Verification request send")  
      }
        else{
          toast.error('error in sending request')
        }
    }catch(error){
      console.log("errror in request",error)
    }
   }
}

  return (
   <>
    <section className='relative w-full bg-fuchsia-100 pt-14 pb-20'>
        <div className="max-w-5xl sm:mx-auto mx-3 md:px-8 px-2 shadow-sm bg-white py-6 rounded-md">  
      <h2 className='text-2xl text-center text-purple-950 mb-4 capitalize'>{user.name}</h2>
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-end gap-16">
      <div className="space-y-1 px-10 md:px-1">
      <p className='text-md text-gray-600 font-semibold'>Profile details:</p>
      <div className='text-sm text-gray-600 space-y-2'>
        <p>User name : {user.name}</p>
        <p>User email : {user.email}</p>
        <p>User phone : {user.phone?user.phone:"not found"}</p>
        <p>Phone verified: {user.phone_verified ?<>
        {user.phone_verified===true?"Verified":<>("not verified ")</>}</>
          :"not verified"}</p>
         <p> User Type : <>{user.role}</></p>
         <Button small label={"Update profile"} icon={FaRegEdit} onClick={()=>{dispatch(openModal('updateProfile'))}}/>
      </div>
      </div>
     {/* upload resume */}
     <div className='px-4 md:px-0'><ResumeUpload/></div>

      {/* sidepart */}
      <div className="px-6 md:px-4 py-4 bg-fuchsia-100 rounded-md mx-4 md:mx-0">
        <div className='mx-auto w-16 my-2'><img className="rounded-full" src='/avatar.jpg'/></div>
        <hr />
        <div className="mx-auto space-y-2 mt-3">
         
        <div className='flex justify-between items-center w-full'>
           <div className='mr-3'>Phone-no : </div>
           <div className='text-fuchsia-700 font-thin'>{user.phone_verified?"verified":
           (<Button small outline label={"verify"} onClick={()=>{handleVerify()}}/>)}</div>
        </div>
        <div className='flex justify-between items-center'>
        <div className='mr-2'>user role :</div><div className='text-fuchsia-700 font-thin'>{user.role}</div></div>
        <div className='flex justify-between items-center space-x-2'>
           <div className='mr-5'>Resume : </div>
           <div className='text-fuchsia-700 font-thin'>{!user.resume?"not submitted":
           (<Button small outline label={"View"} onClick={()=>{handleDownloadResume(user._id)}}/>)}</div>
        </div>
        </div>
      </div>
    </div>
  </div>     
</section>
    <UserJobView/>
    </>
  );
};

export default UserProfile;