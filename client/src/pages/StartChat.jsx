// StartChat.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/AxiosConfig'
import { CHAT_SERVER_URL } from '../utils/API';
function StartChat() {
  const [otherUserId, setOtherUserId] = useState('');
  
  
  const currentUserId="668bf3accb7f584ef247e7e2"
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${CHAT_SERVER_URL}/chat/start-chat`, { currentUserId, otherUserId });
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