import React, { useState } from 'react';
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
  SelectChangeEvent 
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Icône de fichier

const START_YEAR = 2000; // Année limite inférieure

export default function UploadCsv() {
  const [open, setOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null); 
  const [selectedYear, setSelectedYear] = useState<number | ''>('');

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
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value));
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
      />
      <label htmlFor="upload-csv">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadFileIcon />}
        >
          Télécharger CSV
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
          <Button onClick={handleClose} color="primary" variant="contained">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
