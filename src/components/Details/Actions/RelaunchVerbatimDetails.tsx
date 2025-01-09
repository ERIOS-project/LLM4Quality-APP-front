import React from 'react';
import Verbatim from "../../../models/Verbatim";
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch } from 'react-redux';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';

interface RelaunchVerbatimDetailsProps {
    verbatim: Verbatim;
}

export default function RelaunchVerbatimDetails({ verbatim }: RelaunchVerbatimDetailsProps) {
    const dispatch = useDispatch();

    const handleRelaunch = () => {
        rerunClassification(
            [verbatim],
            () => dispatch(setSuccessToast({ open: true, message: 'Reclassification en cours...' })),
            () => dispatch(setErrorToast({ open: true, message: 'Une erreur est survenue lors de la reclassification.' }))
        );
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