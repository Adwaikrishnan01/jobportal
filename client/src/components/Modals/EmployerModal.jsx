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
        className="w-full bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg 
        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50">
        Submit
      </button>
    </Modal>
  );
};

export default EmployerModal;