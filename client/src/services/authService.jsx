// services/authService.js
import axios from '../utils/AxiosConfig';
import { logoutUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import axio from 'axios'

const API_URL = 'http://localhost:3000';

export const login = async (email, password) => {
  const response = await axios.post('/login', { email, password });
  return response.data;
};

export const googleLogin = async () => {
  const response = await axio.get(`${API_URL}/auth/google`);
  return response.data;
};

export const logout = (dispatch) => {
  dispatch(logoutUser())
};