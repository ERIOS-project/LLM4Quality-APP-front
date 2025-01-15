import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { RootState } from '../redux/store';
import { removeToast } from '../redux/toastSlice';

export default function ToastManager() {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  const handleClose = (id: string) => (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(removeToast(id));
  };

  return (
    <>
      {toasts.slice().reverse().map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={6000}
          onClose={handleClose(toast.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          sx={{ marginBottom: `${index * 60}px` }} // Espacement entre les toasts
        >
          <Alert onClose={handleClose(toast.id)} severity={toast.severity} sx={{ width: '100%' }}>
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}