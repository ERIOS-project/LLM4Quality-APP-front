import React from 'react';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function UploadCsv() {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<UploadFileIcon />}
            >
                Télécharger CSV
            </Button>
        </div>
    );
}