import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../Input';
import axios from '../../utils/AxiosConfig'
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/slices/modalSlice';
import { fetchCurrentUser } from '../../redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const VerifyPhoneModal = () => {
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);
  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    phone: '',
    otp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/verify', { code: formData.otp }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('Verification successful:', response.data);
        dispatch(closeModal('verifyPhone'))
        dispatch(fetchCurrentUser())
        toast.success("Phone verified succesfully")
      } else {
        console.error('Verification failed:', response.statusText);
        toast.error("Error in verification")
      }
    } catch (error) {
      console.error('Error during verification:', error);
      toast.error("Error in verification")
    }
  };

  return (
    <Modal name="verifyPhone" title="Verify Phone Number">
      <form onSubmit={handleSubmit}>
      <Input 
          className="form-input mb-4" 
          label="Phone Number"
          name="phone"
          value={user?.phone}
          onChange={handleChange}
          required
          readOnly
        />
        <Input
          className="form-input mb-4"
          label="Enter OTP"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
          required
        />
      <button
        type="submit"
        className="w-full bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg 
        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50">
        Send
      </button></form>
      <ToastContainer/>
    </Modal>
  );
};

export default VerifyPhoneModal;
