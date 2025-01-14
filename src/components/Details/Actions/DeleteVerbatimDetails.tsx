import React from 'react';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteVerbatims } from '../../../api/verbatims';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';
import colors from '../../../utils/color'; // Import colors for consistent theme

interface DeleteVerbatimDetailsProps {
    id: string;
}

export default function DeleteVerbatimDetails({ id }: DeleteVerbatimDetailsProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                backgroundColor: 'white',
                color: 'rgb(46,61,81)', // Texte noir
                fontSize: '0.875rem',
                textTransform: 'none',
                padding: '6px 12px',
                borderRadius: '20px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={handleDelete}
        >
            Supprimer
        </Button>
    );
}