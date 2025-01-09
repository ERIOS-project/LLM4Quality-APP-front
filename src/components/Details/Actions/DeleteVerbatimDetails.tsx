import React from 'react';
import { Button } from "@mui/material";
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
        <div>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ fontSize: '1.25rem', padding: '12px 24px', textTransform: 'none' }}
                onClick={handleDelete}
            >
                Supprimer
            </Button>
        </div>
    );
}