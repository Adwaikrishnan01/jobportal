import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import {API_URL} from '../../utils/API'

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  user: null,
  status: 'idle',
  error: null,
};



export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { accessToken } = getState().auth;
    if (!accessToken) {
      return rejectWithValue('No access token available');
    }
    try {
      const response = await axios.get(`${API_URL}/currentuser`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await dispatch(refreshToken());
          const { accessToken } = getState().auth; // Get the updated token
          const response = await axios.get(`${API_URL}/currentuser`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          return response.data;
        } catch (refreshError) {
          return rejectWithValue(refreshError.message);
        }
      }
      return rejectWithValue(error.message);
    }
  }
);


export const refreshToken = createAsyncThunk(
  '/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    const { refreshToken } = getState().auth;
    try {
      const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logoutUser: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    updateTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    // setUser: (state, action) => {
    //   state.user = action.payload;
    //   state.isAuthenticated = true;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});
 
export const { loginUser, logoutUser, updateTokens ,setUser} = authSlice.actions; 
export default authSlice.reducer;