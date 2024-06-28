import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Input from '../Input';

const EmployerModal = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Employer Form Data:', data);
    // Handle form submission
  };

  return (
    <Modal name="employer" title="Employer Information">
      <Input
        className="form-input mb-4"
        label={"Company name"}
        {...register('companyName')}
      />
      <Input
        className="form-input mb-4"
       label={"Company Role"}
        {...register('companyRole')}
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

export default EmployerModal;