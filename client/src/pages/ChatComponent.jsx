// ChatComponent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../redux/slices/authSlice';



const ChatComponent=()=> {  
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  
   const userId = '668bf3accb7f584ef247e7e2'
  
  // const {user}=useSelector(state=>state.auth)
  // const userId =user.id
   console.log("chatuserid",userId)
  useEffect(() => {
    // Ensure userId is defined before attempting to connect
    if (userId) {
      const newSocket = io('http://localhost:3000', {
        auth: { userId },
        transports: ['polling', 'websocket'], // Allow both polling and websocket
      });
  
      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
  
      newSocket.on('connect', () => {
        console.log('Connected to server with userId:', userId);
        setSocket(newSocket);
        // Make sure roomId is defined before emitting
        if (roomId) {
          newSocket.emit('join room', roomId);
        }
      });
  
      return () => newSocket.close();
    } else {
      console.error('UserId is undefined. Cannot connect to socket.');
    }
  }, [userId, roomId]); 

  useEffect(() => {
    if (socket) {
      socket.on('new message', (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const sendMessage = (content) => {
    if (socket) {
      socket.emit('send message', { roomId, message: content });
    }
  };

  return (
    <div className="text-red-400">
      <MessageList messages={messages} currentUserId={userId} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default ChatComponent;

