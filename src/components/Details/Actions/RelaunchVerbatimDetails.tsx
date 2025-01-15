import React from 'react';
import Verbatim from "../../../models/Verbatim";
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch } from 'react-redux';
import { rerunClassification } from '../../../api/websockets/rerun';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';
import { useTheme } from '@mui/material/styles'; // Import du hook useTheme pour accéder au thème

interface RelaunchVerbatimDetailsProps {
    verbatim: Verbatim;
}

export default function RelaunchVerbatimDetails({ verbatim }: RelaunchVerbatimDetailsProps) {
    const dispatch = useDispatch();
    const theme = useTheme(); // Utilisation du thème Material-UI

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
                backgroundColor: theme.palette.background.paper, // Fond dynamique en fonction du thème
                color: theme.palette.text.primary, // Couleur du texte adaptée au thème
                fontSize: '0.875rem',
                textTransform: 'none',
                padding: '6px 12px',
                borderRadius: '20px',
                boxShadow: theme.shadows[2], // Ombre dynamique du thème
                '&:hover': {
                    backgroundColor: theme.palette.action.hover, // Fond au survol en fonction du thème
                },
            }}
            onClick={handleRelaunch}
        >
            Relancer
        </Button>
    );
}
