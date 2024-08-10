import React from 'react';
import axios from '../../utils/AxiosConfig'
import { toast } from 'react-toastify';
import { FaUserEdit } from "react-icons/fa";
const UserTable = ({ users, onDeleteUser }) => {
 
  const changeRole=async(user)=>{
    const userId=user._id
   try{
    const response = await axios.put(`/admin/change-role/${userId}`)
       window.location.reload()
        toast.info(response.data.message)   
   }catch(error){
    console.log(error)
   }
  }
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-blue-500 cursor-pointer" onClick={()=>{changeRole(user)}}>
                {user?.role==='admin'?"admin":"user"}<FaUserEdit /></td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onDeleteUser(user._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;