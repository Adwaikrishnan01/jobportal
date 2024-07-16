import React, { useState } from 'react';
import Input from '../Input.jsx'
import axios from '../../utils/AxiosConfig.js'
import Modal from './Modal.jsx';
import { toast } from 'react-toastify';
import { closeModal } from '../../redux/slices/modalSlice.js';
import { useDispatch } from 'react-redux';


const createFeedPostingAction = async (formData) => {
    
  try {
    const response = await axios.post('/feeds/postfeed', {
      feedTitle: formData.get('feedTitle'),
      feedDescription: formData.get('feedDescription'),
    },);
    return { success: true, message: 'feed posting created successfully!' };
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { success: false, message: 'Error creating feed posting. Please try again.' };
  }
};

const PostFeedModal = () => {
  const [message, setMessage] = useState('');
  const dispatch=useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData(e.target);
          const result = await createFeedPostingAction(formData);
          console.log(result)
          if(result){
          toast.info(result.message)}
          setMessage(result.message);
          if (result.success) {
            e.target.reset(); 
            dispatch(closeModal('postfeed'))
            window.location.reload();
          }
          }catch(error){
            toast.error(error.message)
          }
    
  };

  return (
    <Modal name="postfeed" title="Create New feed">
      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input label="feed Title" id="feedTitle" name="feedTitle" required />
        <div className="mb-2">
          <label htmlFor="feedDescription" className="block text-gray-700 font-bold mb-1">feed Description</label>
          <textarea
            id="feedDescription"
            name="feedDescription"
            className="w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg 
          hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-opacity-50">
          Post feed
        </button>
      </form>

    </Modal>
  );
};

export default PostFeedModal;