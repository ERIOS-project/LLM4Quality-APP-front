import React from 'react';
import { Button, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteVerbatims } from '../../../api/verbatims';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';

interface DeleteVerbatimDetailsProps {
    id: string;
}

export default function DeleteVerbatimDetails({ id }: DeleteVerbatimDetailsProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme(); // Utilisation du thème Material-UI

    const mutation = useMutation(() => deleteVerbatims([id]), {
        onSuccess: () => {
            queryClient.invalidateQueries('verbatims');
            dispatch(setSuccessToast({ open: true, message: 'Verbatim supprimé avec succès.' }));
            navigate('/');
        },
        onError: () => {
            dispatch(setErrorToast({ open: true, message: 'Une erreur est survenue lors de la suppression du verbatim.' }));
        },
    });

    const handleDelete = () => {
        mutation.mutate();
    };

    return (
        <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
                backgroundColor: theme.palette.background.paper, // Fond basé sur le thème
                color: theme.palette.text.secondary, // Texte principal basé sur le thème
                fontSize: '0.875rem',
                textTransform: 'none',
                padding: '6px 12px',
                borderRadius: '20px',
                boxShadow: theme.shadows[2], // Ombre dynamique du thème
                '&:hover': {
                    backgroundColor: theme.palette.action.hover, // Couleur au survol
                },
            }}
            onClick={handleDelete}
        >
            Supprimer
        </Button>
    );
}
