import React, { useEffect, useState } from 'react'
import axios from '../../utils/AxiosConfig'
const UserList = ({ onUserClick}) => {

        const [messagedUsers, setMessagedUsers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        
        useEffect(() => {
          const fetchMessagedUsers = async () => {
            try {
              setLoading(true);
              const response = await axios.get('/chat/messaged-users');
              console.log("message users list",response)
              setMessagedUsers(response.data);
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
    //     <ul>
    //     {users.map(user => (
    //       <li
    //         key={user.id}
    //         onClick={() => onUserClick(user)}
    //         className="cursor-pointer hover:bg-gray-100 p-2 rounded"
    //       >
    //         {user.name}
    //       </li>
    //     ))}
    //   </ul>

    )
}

export default UserList