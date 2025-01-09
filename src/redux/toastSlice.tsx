import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  successToastOpen: boolean;
  errorToastOpen: boolean;
  successMessage: string;
  errorMessage: string;
}

const initialState: ToastState = {
  successToastOpen: false,
  errorToastOpen: false,
  successMessage: '',
  errorMessage: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setSuccessToast(state, action: PayloadAction<{ open: boolean; message: string }>) {
      state.successToastOpen = action.payload.open;
      state.successMessage = action.payload.message;
    },
    setErrorToast(state, action: PayloadAction<{ open: boolean; message: string }>) {
      state.errorToastOpen = action.payload.open;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { setSuccessToast, setErrorToast } = toastSlice.actions;
export default toastSlice.reducer;