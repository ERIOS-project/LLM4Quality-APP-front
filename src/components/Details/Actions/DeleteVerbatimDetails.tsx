import React from 'react';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deleteVerbatims } from '../../../api/verbatims';

interface DeleteVerbatimDetailsProps {
    id: string;
}

export default function DeleteVerbatimDetails({ id }: DeleteVerbatimDetailsProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(() => deleteVerbatims([id]), {
        onSuccess: () => {
            queryClient.invalidateQueries('verbatims');
            navigate('/');
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