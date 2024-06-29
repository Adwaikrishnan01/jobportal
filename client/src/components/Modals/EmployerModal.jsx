import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../Input';
import axios from '../../utils/AxiosConfig';
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { fetchCurrentUser } from '../../redux/slices/authSlice';

const EmployerModal = () => {
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    companyName: '',
    companyRole: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/profile/changeuser', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        toast.success("User updated successfully")
        dispatch(fetchCurrentUser())
        dispatch(closeModal('employer'))
        
      } else {
        console.error('Error updating user role:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Modal name="employer" title="Employer Information">
   <form onSubmit={handleSubmit}>
    <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <Input
          label="Company Role"
          name="companyRole"
          value={formData.companyRole}
          onChange={handleChange}
          required
        />
      <button
        type="submit"
        className="w-full bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg 
        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50">
        Submit
      </button>
    </form>
  </Modal>
  );
};

export default EmployerModal;