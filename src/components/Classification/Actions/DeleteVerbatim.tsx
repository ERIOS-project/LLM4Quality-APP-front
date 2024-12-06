import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteVerbatim() {
    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                Supprimer le(s) verbatim(s)
            </Button>
        </div>
    );
}