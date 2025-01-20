import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deleteVerbatims } from '../../../api/verbatims';
import { setToast } from '../../../redux/toastSlice'; // Import du thunk setToast
import { Box } from '@mui/material';
import { useThemeContext } from '../../../components/ThemeContextProvider'; // Importation du ThemeContext
import type { AppDispatch } from '../../../redux/store';

interface DeleteVerbatimProps {
  isMobile: boolean;
}

export default function DeleteVerbatim({ isMobile }: DeleteVerbatimProps) {
  const { darkMode } = useThemeContext(); // Utilisation du ThemeContext pour obtenir le mode
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);

  const mutation = useMutation(deleteVerbatims, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('verbatims');
      dispatch(
        setToast(
          `${variables.length} fichier(s) supprimé(s) avec succès.`,
          'success',
          5000 // Toast disparaît après 5 secondes
        )
      );
    },
    onError: () => {
      dispatch(
        setToast(
          'Une erreur est survenue lors de la suppression des fichiers.',
          'error',
          5000 // Toast disparaît après 5 secondes
        )
      );
    },
  });

  const handleDelete = () => {
    const ids = selectedRows.map((verbatim) => verbatim._id);
    mutation.mutate(ids);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Button
        variant="contained"
        startIcon={!isMobile && <DeleteIcon />} // Afficher l'icône uniquement si ce n'est pas mobile
        sx={{
          fontSize: isMobile ? '0' : '1.1rem', // Ajuster la taille de la police pour mobile
          padding: isMobile ? '12px' : '12px 24px', // Ajuster le padding pour mobile
          textTransform: 'none', // Garde la police naturelle
          borderRadius: isMobile ? '50%' : '8px', // Coins arrondis pour un aspect moderne ou rond pour mobile
          backgroundColor: darkMode ? '#d32f2f' : '#d32f2f', // Rouge pour signaler la suppression
          color: '#ffffff', // Texte blanc pour le contraste
          boxShadow: darkMode
            ? '0 4px 8px rgba(0, 0, 0, 0.1)'
            : '0 4px 8px rgba(0, 0, 0, 0.1)', // Ombre douce pour profondeur
          '&:hover': {
            backgroundColor: darkMode ? '#9A0007' : '#9A0007', // Rouge plus foncé au survol
            boxShadow: darkMode
              ? '0 6px 12px rgba(0, 0, 0, 0.15)'
              : '0 6px 12px rgba(0, 0, 0, 0.15)', // Ombre plus marquée au survol
          },
          '&:active': {
            backgroundColor: darkMode ? '#7A0004' : '#7A0004', // Rouge encore plus foncé au clic
          },
          verticalAlign: 'middle',
          width: isMobile ? '48px' : 'auto', // Ajuster la largeur pour mobile
          height: isMobile ? '48px' : 'auto', // Ajuster la hauteur pour mobile
          minWidth: 'auto', // Supprimer la largeur minimale par défaut
        }}
        onClick={handleDelete}
      >
        {isMobile ? <DeleteIcon /> : 'Supprimer'} {/* Afficher l'icône au centre si mobile, sinon le texte */}
      </Button>
    </Box>
  );
}