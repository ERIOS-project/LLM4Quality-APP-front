import React from 'react';
import Verbatim from "../../../models/Verbatim";
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch } from 'react-redux';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';
import colors from '../../../utils/color'; // Import colors for consistent theme

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
        <Button
            variant="contained"
            startIcon={<ReplayIcon />}
            sx={{
                backgroundColor: 'white',
                color: 'rgb(46,61,81)', // Texte noir
                fontSize: '0.875rem',
                textTransform: 'none',
                padding: '6px 12px',
                borderRadius: '20px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={handleRelaunch}
        >
            Relancer
        </Button>
    );
}
