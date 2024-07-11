// StartChat.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/AxiosConfig'

function StartChat() {
  const [otherUserId, setOtherUserId] = useState('');
  const navigate = useNavigate();
  // const {user}=useSelector(state=>state.auth)
  
  
  // const currentUserId=user.id
  const currentUserId = '668bf3accb7f584ef247e7e2'
console.log("startchadid",currentUserId)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/chat/start-chat', { currentUserId, otherUserId });
      const data =  response.data;
      navigate(`/chat/${data.roomId}`);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={otherUserId} 
        onChange={(e) => setOtherUserId(e.target.value)} 
        placeholder="Enter user ID to chat with"
      />
      <button type="submit">Start Chat</button>
    </form>
  );
}

export default StartChat;