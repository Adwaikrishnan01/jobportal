// services/authService.js
import axios from 'axios';

const API_URL = 'http://your-backend-url';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const googleLogin = async (tokenId) => {
  const response = await axios.post(`${API_URL}/auth/google`, { tokenId });
  return response.data;
};

export const logout = () => {
  // Implement logout logic if needed on the server
};