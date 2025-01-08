import React from 'react';
import Verbatim from "../../../models/Verbatim";
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { rerunClassification } from '../../../api/websockets/rerun';

interface RelaunchVerbatimDetailsProps {
    verbatim: Verbatim;
}

export default function RelaunchVerbatimDetails({ verbatim }: RelaunchVerbatimDetailsProps) {
    const handleRelaunch = () => {
        rerunClassification([verbatim]);
    };

    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
                sx={{ fontSize: '1.25rem', padding: '12px 24px', textTransform: 'none' }}
                onClick={handleRelaunch}
            >
                Relancer
            </Button>
        </div>
    );
}