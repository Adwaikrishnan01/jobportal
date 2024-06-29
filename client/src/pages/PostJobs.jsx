import React, { useState } from 'react';
import Input from '../components/Input.jsx'
import axios from '../utils/AxiosConfig.js'

const createJobPostingAction = async (formData) => {
  try {
    const response = await axios.post('/jobs/postjob', {
      jobTitle: formData.get('jobTitle'),
      companyName: formData.get('companyName'),
      requiredSkills: formData.get('requiredSkills').split(',').map(skill => skill.trim()),
      experience: {
        min: parseInt(formData.get('experienceMin')),
        max: parseInt(formData.get('experienceMax'))
      },
      location: formData.get('location'),
      jobDescription: formData.get('jobDescription'),
      salary: formData.get('salary')
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return { success: true, message: 'Job posting created successfully!' };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { success: false, message: 'Error creating job posting. Please try again.' };
  }
};

const CreateJobPosting = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await createJobPostingAction(formData);
    setMessage(result.message);
    if (result.success) {
      e.target.reset(); 
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-fuchsia-800 text-center">Create Job Posting</h2>
      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input label="Job Title" id="jobTitle" name="jobTitle" required />
        <Input label="Company Name" id="companyName" name="companyName" required />
        <Input label="Required Skills (comma-separated)" id="requiredSkills" name="requiredSkills" />
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <Input label="Min Experience (years)" id="experienceMin" name="experienceMin" type="number" required />
          </div>
          <div className="w-1/2">
            <Input label="Max Experience (years)" id="experienceMax" name="experienceMax" type="number" required />
          </div>
        </div>
        <Input label="Location" id="location" name="location" required />
        <div className="mb-4">
          <label htmlFor="jobDescription" className="block text-gray-700 font-bold mb-2">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <Input label="Salary" id="salary" name="salary" />
        <button
          type="submit"
          className="w-full bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg 
          hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50">
          Create Job Posting
        </button>
      </form>
    </div>
  );
};

export default CreateJobPosting;