import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
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
    <div className='mx-auto flex items-center justify-center'>
        <div className="flex flex-col border-dashed border-2 border-fuchsia-500 rounded-lg py-3 px-5 space-y-3 w-full">
      <h2 className='text-sm text-fuchsia-600 m-1'>{user.resume?"Update Your Resume":"Upload Your Resume"}</h2>
      <form onSubmit={handleSubmit} className='space-y-2 flex flex-col'>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" 
        className='file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold
         file:bg-fuchsia-100 file:text-fuchsia-700 hover:file:bg-fuchsia-200'/>
        <Button type="submit" small label={"upload"}/>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default ResumeUpload;