import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import axios from '../../utils/AxiosConfig'
import { fetchCurrentUser } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const UpdateProfileModal = () => {
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skills: '',
    gender: '',
    age: '',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/update/profile', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if(response.status===200)
      toast.success("Profile update successfully")
       dispatch(fetchCurrentUser())
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Error updating profile")
    }
  };
  

  return (
    <Modal name="updateProfile" title="Update Profile">
      <form onSubmit={handleSubmit}>
        <Input
          className="form-input mb-4"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          className="form-input mb-4"
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          className="form-input mb-4"
          label="Skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />
        <Input
          className="form-input mb-4"
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <Input
          className="form-input mb-4"
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <Input
          className="form-input mb-4"
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg
           hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50"
        >
          Update profile
        </button>
      </form>
    </Modal>
  );
};

export default UpdateProfileModal;
