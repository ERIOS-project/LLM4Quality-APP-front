import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteVerbatim() {
    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ fontSize: '1.05rem', padding: '12px 24px',  textTransform: 'none'  }}
            >
                Supprimer
            </Button>
        </div>
    );
}