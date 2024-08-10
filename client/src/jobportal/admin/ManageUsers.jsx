import React, { useState, useEffect } from 'react';
import axios from '../utils/AxiosConfig';
import UserTable from '../components/tables/UserTable';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';

const ManageUsers = () => {
   const {user}=useSelector(state=>state.auth)
   const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/users');
        const users=response.data.users.filter(item=>(
          item._id!=user._id
        ))
        setUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email.trim() === '') {
        setFilteredUsers(users);
      } else {
        const response = await axios.get(`/admin/users/search?email=${email}`);
        setFilteredUsers([response.data]);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while searching');
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmail('');
    setFilteredUsers(users);
    setError('');
  };


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
    <div className="mx-auto px-4 w-5/6">
    <h1 className="text-xl my-6 from-neutral-800">User Management </h1>
    <div className='bg-white rounded-md px-8 py-6 my-6 '>
     
      <form onSubmit={handleSearch}>
      <label  className="block text-gray-700 text-md mb-3">
       Search user
      </label>
        <input className='border border-slate-400 py-1 rounded-md mr-2 px-3'
          type="email"
          label="Search user"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user email"
        />
        <button type="submit" disabled={loading} className='bg-blue-400 text-white px-4 py-1 text-center rounded-md shadow-md mr-2 border border-blue-400 cursor-pointer' > 
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button type="button" onClick={handleClear} className='bg-white px-4 py-1 text-center rounded-md shadow-md border border-slate-500 cursor-pointer'>
          Clear
        </button>
      </form>
    </div>
    

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <UserTable users={filteredUsers} onDeleteUser={deleteUser} />
    
  </div></div>
  )
}

export default ManageUsers