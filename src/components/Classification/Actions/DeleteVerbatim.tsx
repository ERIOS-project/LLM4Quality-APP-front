import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deleteVerbatims } from '../../../api/verbatims';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { setDeleteVerbatimSuccessToast, setDeleteVerbatimErrorToast } from '../../../redux/toastSlice';
import 

export default function DeleteVerbatim() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);
  const successToastOpen = useSelector((state: RootState) => state.toast.deleteVerbatimSuccessToast);
  const errorToastOpen = useSelector((state: RootState) => state.toast.deleteVerbatimErrorToast);
  const [deletedCount, setDeletedCount] = useState(0);

  const mutation = useMutation(deleteVerbatims, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('verbatims');
      setDeletedCount(variables.length);
      dispatch(setDeleteVerbatimSuccessToast(true));
    },
    onError: () => {
      dispatch(setDeleteVerbatimErrorToast(true));
    },
  });

  const handleDelete = () => {
    const ids = selectedRows.map((verbatim) => verbatim._id);
    mutation.mutate(ids);
  };

  const handleSuccessToastClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setDeleteVerbatimSuccessToast(false));
  };

  const handleErrorToastClose = (event?: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setDeleteVerbatimErrorToast(false));
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        sx={{ fontSize: '1.05rem', padding: '12px 24px', textTransform: 'none' }}
        onClick={handleDelete}
      >
        Supprimer
      </Button>

      <Snackbar open={successToastOpen} autoHideDuration={6000} onClose={handleSuccessToastClose}>
        <Alert onClose={handleSuccessToastClose} severity="success" sx={{ width: '100%' }}>
          {deletedCount} fichier(s) supprimé(s) avec succès.
        </Alert>
      </Snackbar>

      <Snackbar open={errorToastOpen} autoHideDuration={6000} onClose={handleErrorToastClose}>
        <Alert onClose={handleErrorToastClose} severity="error" sx={{ width: '100%' }}>
          Une erreur est survenue lors de la suppression des fichiers.
        </Alert>
      </Snackbar>
    </div>
  );
}