import React, { useState, useEffect } from 'react';
import axios from '../utils/AxiosConfig';
import UserTable from '../components/tables/UserTable';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';

const ManageUsers = () => {
   const {user}=useSelector(state=>state.auth)
    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/users');
        const users=response.data.users.filter(item=>(
          item._id!=user._id
        ))
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/user/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success("user deleted successfully")
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
   <div className='md:flex bg-fuchsia-50'>
    <Sidebar user={user}/>
    <div className="container mx-auto px-4">
    <h1 className="text-2xl font-semibold my-6">User Management</h1>
    <UserTable users={users} onDeleteUser={deleteUser} />
  </div></div>
  )
}

export default ManageUsers