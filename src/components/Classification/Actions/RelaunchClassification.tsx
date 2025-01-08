import React from 'react';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import Verbatim from '../../../models/Verbatim';

export default function RelaunchClassification() {
  const selectedRows = useSelector((state: RootState) => state.selectedRows.selectedRows);

  const handleRelaunch = () => {
    // Vérifiez que les lignes sélectionnées sont de type Verbatim
    const verbatims: Verbatim[] = selectedRows.filter((row): row is Verbatim => row.hasOwnProperty('_id'));

    if (verbatims.length > 0) {
      const socket = new WebSocket(`${import.meta.env.VITE_API_URL.replace(/^http/, 'ws')}/ws`);

      socket.onopen = () => {
        const message = {
          action: "RERUN",
          verbatims: verbatims.map(verbatim => ({
            _id: verbatim._id,
            content: verbatim.content,
            status: verbatim.status,
            result: verbatim.result,
            year: verbatim.year,
            created_at: verbatim.created_at,
          })),
        };
        socket.send(JSON.stringify(message));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Message reçu:', data); // Imprimer les messages reçus
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<ReplayIcon />}
        sx={{ fontSize: '1.05rem', padding: '12px 24px', textTransform: 'none' }}
        onClick={handleRelaunch}
      >
        Relancer
      </Button>
    </div>
  );
}