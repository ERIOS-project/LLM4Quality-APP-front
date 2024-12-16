import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteVerbatim() {
    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
            >
                Supprimer
            </Button>
        </div>
    );
}