import React, { useEffect, useState } from 'react'
import axios from '../../utils/AxiosConfig'
import ChatHeader from './ChatHeader';
import { useSelector } from 'react-redux';
const UserList = ({ onUserClick}) => {

        const userId=useSelector(state=>state.auth.user._id)
        const [messagedUsers, setMessagedUsers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        
        useEffect(() => {
          const fetchMessagedUsers = async () => {
            try {
              setLoading(true);
              const response = await axios.get('/chat/messaged-users');
              const users=response?.data.filter(user=>(user._id!==userId))
              setMessagedUsers(users);
              setLoading(false);
            } catch (err) {
              console.error('Error fetching messaged users:', err);
              setError('Failed to fetch users. Please try again.');
              setLoading(false);
            }
          };
      
          fetchMessagedUsers();
        }, []);
      
   
    return (
      <div>
        <ChatHeader/>
        <div>
            {messagedUsers.map((user) => (
                <div className='w-full border border-y-fuchsia-200 px-2 py-1 h-20 flex items-center
                 bg-fuchsia-50' key={user._id} onClick={() => onUserClick(user._id,user.name)}>
                    <div className='w-1/6 mx-3'>
                        <img src='/avatar.jpg' alt='img' width={48} className='rounded-full'
                             /></div>
                    <div className="w-5/6 font-semibold text-gray-800">{user.name}</div>
                </div>
            ))}
        </div>
   </div>
    )
}

export default UserList