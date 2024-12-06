import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';

export default function RelaunchClassification() {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<ReplayIcon />}
            >
                Relancer le(s) classification(s)
            </Button>
        </div>
    );
}