import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deleteVerbatims } from '../../../api/verbatims';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';

export default function DeleteVerbatim() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);

  const mutation = useMutation(deleteVerbatims, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('verbatims');
      dispatch(setSuccessToast({ open: true, message: `${variables.length} fichier(s) supprimé(s) avec succès.` }));
    },
    onError: () => {
      dispatch(setErrorToast({ open: true, message: 'Une erreur est survenue lors de la suppression des fichiers.' }));
    },
  });

  const handleDelete = () => {
    const ids = selectedRows.map((verbatim) => verbatim._id);
    mutation.mutate(ids);
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
    </div>
  );
}