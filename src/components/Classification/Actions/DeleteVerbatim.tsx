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
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        sx={{
          fontSize: '1.1rem',
          padding: '12px 24px', // Espacement ajusté pour un bouton plus net
          textTransform: 'none', // Garde la police naturelle
          borderRadius: '8px', // Coins arrondis pour un aspect moderne
          backgroundColor: '#d32f2f', // Rouge sérieux pour signaler une suppression
          color: '#ffffff', // Texte blanc pour le contraste
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Ombre douce pour profondeur
          '&:hover': {
            backgroundColor: '#9A0007', // Rouge plus foncé au survol
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Ombre un peu plus marquée au survol
          },
          '&:active': {
            backgroundColor: '#7A0004', // Rouge encore plus foncé au clic
          },
        }}
        onClick={handleDelete}
      >
        Supprimer
      </Button>
    </div>
  );
}
