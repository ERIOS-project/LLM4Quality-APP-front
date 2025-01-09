import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { RootState } from '../redux/store';
import { setSuccessToast, setErrorToast } from '../redux/toastSlice';

export default function ToastManager() {
  const dispatch = useDispatch();
  const successToastOpen = useSelector((state: RootState) => state.toast.successToastOpen);
  const errorToastOpen = useSelector((state: RootState) => state.toast.errorToastOpen);
  const successMessage = useSelector((state: RootState) => state.toast.successMessage);
  const errorMessage = useSelector((state: RootState) => state.toast.errorMessage);

  const handleSuccessToastClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSuccessToast({ open: false, message: '' }));
  };

  const handleErrorToastClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorToast({ open: false, message: '' }));
  };

  return (
    <>
      <Snackbar open={successToastOpen} autoHideDuration={6000} onClose={handleSuccessToastClose}>
        <Alert onClose={handleSuccessToastClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={errorToastOpen} autoHideDuration={6000} onClose={handleErrorToastClose}>
        <Alert onClose={handleErrorToastClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}