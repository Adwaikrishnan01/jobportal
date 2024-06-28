import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Input from '../Input';

const VerifyPhoneModal = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Verify Phone Form Data:', data);
    // Handle form submission
  };

  return (
    <Modal name="verifyPhone" title="Verify Phone Number">
      <Input
        className="form-input mb-4"
        label={"Name"}
        {...register('name')}
      />
      <Input
        className="form-input mb-4"
        label={"Phone Number"}
        {...register('phone')}
      />
      <Input
        className="form-input mb-4"
        label={"Enter OTP"}
        {...register('otp')}
      />
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Submit
      </button>
    </Modal>
  );
};

export default VerifyPhoneModal;
