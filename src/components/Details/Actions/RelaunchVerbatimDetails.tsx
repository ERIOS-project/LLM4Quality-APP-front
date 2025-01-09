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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
                variant="contained"
                startIcon={<ReplayIcon />}
                sx={{
                    fontSize: '1.25rem',
                    padding: '12px 24px',
                    textTransform: 'none',
                    backgroundColor: '#2A3E53', // Utilisation de la couleur de l'Appbar pour le bouton
                    '&:hover': {
                        backgroundColor: '#1c2a37', // Couleur plus foncée au survol
                    },
                    color: '#fff', // Texte blanc pour une meilleure visibilité
                    borderRadius: '8px', // Coins arrondis pour un effet plus moderne
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ombre douce pour l'esthétique
                }}
                onClick={handleRelaunch}
            >
                Relancer
            </Button>
        </div>
    );
}
