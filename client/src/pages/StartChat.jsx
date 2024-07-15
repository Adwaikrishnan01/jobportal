// StartChat.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/AxiosConfig'


export const StartChat=async(currentUserId,selectedUserIdId)=> {

console.log("startchatid",currentUserId,selectedUserIdId)

    try {
      const response = await axios.post('/chat/start-chat', { currentUserId, selectedUserIdId });
      console.log("ress",response)
      const roomId =  response.data.roomId;
      return roomId
      
     // navigate(`/chat/${data.roomId}`);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  

  return (<></>
    // <form onSubmit={handleSubmit}>
    //   <input 
    //     type="text" 
    //     value={otherUserId} 
    //     onChange={(e) => setOtherUserId(e.target.value)} 
    //     placeholder="Enter user ID to chat with"
    //   />
    //   <button type="submit">Start Chat</button>
    // </form>
  );
}

