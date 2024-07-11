import React, { useCallback, useState } from 'react';
import Input from '../Input.jsx'
import axios from '../../utils/AxiosConfig.js'
import Modal from './Modal.jsx';
import { toast } from 'react-toastify';
import { closeModal } from '../../redux/slices/modalSlice.js';
import { useDispatch, useSelector } from 'react-redux';


const createJobPostingAction = async ({formData,companyName}) => {
   
  try {
    const response = await axios.post('/jobs/postjob', {
      jobTitle: formData.get('jobTitle'),
      companyName: companyName,
      requiredSkills: formData.get('requiredSkills').split(',').map(skill => skill.trim()),
      experience: {
        min: parseInt(formData.get('experienceMin')),
        max: parseInt(formData.get('experienceMax'))
      },
      location: formData.get('location'),
      jobDescription: formData.get('jobDescription'),
      salary: formData.get('salary')
    },);
    return { success: true, message: 'Job posting created successfully!' };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { success: false, message: 'Error creating job posting. Please try again.' };
  }
};

const PostJobModal = () => {
  const { user } = useSelector((state) => state.auth);
  const companyName=user?.companyName
  const [message, setMessage] = useState('');
  const dispatch=useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await createJobPostingAction({formData,companyName});
    toast.success("Job posted successfully")
    setMessage(result.message);
    if (result.success) {
      e.target.reset(); 
      dispatch(closeModal('postjob'))
      window.location.reload();
    }
  };

  return (
    <Modal name="postjob" title="Create New Job">
      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-3'>
        <Input label="Job Title" id="jobTitle" name="jobTitle" required />
        <Input label="Company Name" id="companyName" name="companyName" disabled value={companyName}  />
        <Input label="Required Skills (comma-separated)" id="requiredSkills" name="requiredSkills" />
        <Input label="Location" id="location" name="location" required /></div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <Input label="Min Experience (years)" id="experienceMin" name="experienceMin" type="number" required />
          </div>
          <div className="w-1/2">
            <Input label="Max Experience (years)" id="experienceMax" name="experienceMax" type="number" required />
          </div>
        </div>
        
        <div className="mb-2">
          <label htmlFor="jobDescription" className="block text-gray-700 font-bold mb-1">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            required
          ></textarea>
        </div>
        <Input label="Salary" id="salary" name="salary" />
        <button
          type="submit"
          className="w-full bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg 
          hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50">
          Create new
        </button>
      </form>

    </Modal>
  );
};

export default PostJobModal;
