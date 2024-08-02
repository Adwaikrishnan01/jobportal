import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModals: {}
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.activeModals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.activeModals[action.payload] = false;
    }
  }
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;