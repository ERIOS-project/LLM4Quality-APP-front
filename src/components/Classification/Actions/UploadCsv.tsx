import React, { useState, useRef } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  MenuItem, 
  Select, 
  Typography, 
  Box, 
  SelectChangeEvent,
  Snackbar,
  Alert
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Icône de fichier

const START_YEAR = 2000; // Année limite inférieure

export default function UploadCsv() {
  const [open, setOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null); 
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [toastOpen, setToastOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Fichier uploadé :', file);
      setFileInfo({ name: file.name, size: file.size }); 
      setOpen(true); 
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFileInfo(null);
    setSelectedYear('');
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Réinitialiser la valeur de l'élément <input>
    }
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value));
  };

  const openWebSocket = () => {
    const socket = new WebSocket(`${import.meta.env.VITE_API_URL.replace(/^http/, 'ws')}/ws`);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      const message = {
        action: "CSV",
        file: "ctquooi?\nAlexis pitié\nGuette la dingz"
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
  };

  const handleValidate = () => {
    if (!selectedYear) {
      setToastOpen(true);
    } else {
      openWebSocket(); // Ouvrir la connexion WebSocket
      handleClose();
    }
  };

  const handleToastClose = () => {
    setToastOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - START_YEAR + 1 }, (_, i) => currentYear - i);

  return (
    <div>
      <input
        accept=".csv,.xlsx,.xls"
        style={{ display: 'none' }}
        id="upload-csv"
        type="file"
        onChange={handleFileUpload}
        ref={fileInputRef} // Ajouter une référence à l'élément <input>
      />
      <label htmlFor="upload-csv">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadFileIcon />}
          sx={{ fontSize: '1.05rem', padding: '12px 24px',  textTransform: 'none'  }}
        >
          Télécharger
        </Button>
      </label>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Fichier Uploadé</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <InsertDriveFileIcon color="primary" sx={{ fontSize: 60 }} />
            {fileInfo && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Nom :</strong> {fileInfo.name}
              </Typography>
            )}
            {fileInfo && (
              <Typography variant="body1">
                <strong>Taille :</strong> {(fileInfo.size / 1024).toFixed(2)} Ko
              </Typography>
            )}
          </Box>

          <DialogContentText sx={{ mb: 2 }}>
            Veuillez choisir une année associée à ce fichier :
          </DialogContentText>

          <Select
            value={selectedYear}
            onChange={handleYearChange}
            displayEmpty
            fullWidth
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Sélectionnez une année
            </MenuItem>
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleValidate} color="primary" variant="contained">
            Valider
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity="warning" sx={{ width: '100%' }}>
          Veuillez sélectionner une année avant de valider.
        </Alert>
      </Snackbar>
    </div>
  );
}