import { useEffect, useState } from "react";
import axios from '../../utils/AxiosConfig'
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { AiOutlineDelete } from "react-icons/ai";

const NotificationModal = () => {
   const [notifications, setNotifications] = useState([]);
   const user = useSelector(state => state.auth.user);

   useEffect(() => {
       const fetchNotifications = async () => {
           if (user && user._id) {
               try {
                   const response = await axios.get(`/jobs/notifications/${user._id}`);
                   setNotifications(response.data);
               } catch (error) {
                   console.error('Error fetching notifications:', error);
               }
           }
       };

       fetchNotifications();
   }, [user]);

  const handleDelete=async()=>{
    if (user && user._id) {
    try{
      await axios.delete(`/jobs/deletenotifications/${user._id}`)
      setNotifications([])
    }catch(error){
      console.log(error)
    }
  }
  }
  return (
    <Modal name="notification" title="Notifications">
      {!user?<div className="text-semibold text-gray-700">Please login to see notifications</div>
      :<>
      <div className="w-full flex text-gray-600 text-sm items-center justify-end space-x-1 px-3 py-1 my-2 cursor-pointer rounded-sm" 
        onClick={handleDelete}><AiOutlineDelete />
        <div>clear</div>
        </div>
      {notifications.map((notification,index)=>(
        <div className='shadow-md border border-gray-300 px-3 py-2 bg-gray-50 rounded-md text-gray-700' key={index}> 
           {notification.message}
        </div>
        ))}</>
      }
      
    </Modal>
  );
};

export default NotificationModal;
