import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Input from '../Input';

const UpdateProfileModal = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Update Profile Form Data:', data);
    // Handle form submission
  };

  return (
    <Modal name="updateProfile" title="Update Profile">
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
        label={"Skills"}
        {...register('skills')}
      />
      <Input
        className="form-input mb-4"
        label={"Gender"}
        {...register('gender')}
      />
      <Input
        className="form-input mb-4"
        label={"Age"}
        {...register('age')}
      />
      <Input
        className="form-input mb-4"
        label={"Experience"}
        {...register('experience')}
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

export default UpdateProfileModal;
