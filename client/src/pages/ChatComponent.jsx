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
  const userId = '668bf3accb7f584ef247e7e2'// Assume we store userId in localStorage
  console.log("chatuserid",userId)

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
        auth: { userId },
        transports: ['polling'], // Try forcing websocket first
      });
    
      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });
    
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setSocket(newSocket);
        newSocket.emit('join room', roomId);
      });

    // Fetch previous messages
    fetch(`http://localhost:3001/chat/messages/${roomId}`)
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));

    
  }, [roomId, userId]);

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

