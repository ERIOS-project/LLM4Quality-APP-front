import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';

export default function RelaunchClassification() {
    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
            >
                Relancer
            </Button>
        </div>
    );
}