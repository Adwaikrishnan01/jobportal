import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
// import { API_URL } from '../utils/API';
// import axios from 'axios';
import axios from '../utils/AxiosConfig'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const { user, isAuthenticated, status } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Upload successful!');
      toast.success("Resume uploaded successfully")
      window.location.reload()
    } catch (error) {
      setUploadStatus('Upload failed. Please try again.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='mx-auto flex items-end justify-center'>
        <div className="border-dashed border-2 border-fuchsia-500 rounded-lg py-3 px-5 space-y-3">
      <h2 className='text-sm text-fuchsia-600 m-1'>{user.resume?"Update Your Resume":"Upload Your Resume"}</h2>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx"/>
        <Button type="submit" small label={"upload"}/>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default ResumeUpload;