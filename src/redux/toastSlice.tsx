import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { v4 as uuidv4 } from 'uuid';

interface Toast {
  id: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: {
      reducer: (state, action: PayloadAction<Toast>) => {
        state.toasts.push(action.payload);
      },
      prepare: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => ({
        payload: { id: uuidv4(), message, severity },
      }),
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

// Thunk for adding toast with auto-dismiss
export const setToast = (
  message: string,
  severity: 'success' | 'error' | 'warning' | 'info',
  timeout: number = 5000 // Default timeout of 5 seconds
) => (dispatch: AppDispatch, getState: () => RootState) => {
  const { toasts } = getState().toast;

  // Check if a toast with the same message and severity already exists
  const existingToast = toasts.find(toast => toast.message === message && toast.severity === severity);
  if (existingToast) {
    return;
  }

  const toast = addToast(message, severity);
  dispatch(toast);

  // Automatically remove the toast after the timeout
  setTimeout(() => {
    dispatch(removeToast(toast.payload.id));
  }, timeout);
};

export default toastSlice.reducer;