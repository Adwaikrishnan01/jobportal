import { useState, useEffect, useCallback, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { API_URL } from '../utils/API';


const useChat = ({ userId, selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const roomId = [userId, selectedUserId].sort().join('_');
  

  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
            auth: { userId },
             transports: ['websocket', 'polling'],
            });
    setSocket(newSocket);

    newSocket.emit('join room', roomId);

    newSocket.on('new message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId, selectedUserId]);

  const sendMessage = useCallback((content) => {
    if (socket) {
      const message = {
        sender: userId,
        receiverId: selectedUserId,
        content,
        roomId,
      };
      socket.emit('send message', message);
    }
  }, [socket, userId, selectedUserId, roomId]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/chat/messages/${roomId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [roomId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, sendMessage };
};

export default useChat;