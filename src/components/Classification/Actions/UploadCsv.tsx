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
  SelectChangeEvent
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch } from 'react-redux';
import { uploadCsv } from '../../../api/websockets/csv';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';

const START_YEAR = 2000; // Année limite inférieure

export default function UploadCsv() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null); 
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  const handleValidate = () => {
    if (!selectedYear) {
      dispatch(setErrorToast({ open: true, message: 'Veuillez sélectionner une année avant de valider.' }));
    } else {
      const reader = new FileReader();
      // Get the file content and upload it
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        dispatch(
          setErrorToast({
            open: true,
            message: "Une erreur est survenue lors de l'upload du fichier.",
          })
        );
      } else {
        reader.readAsText(file);
        reader.onload = () => {
          const fileContent = reader.result as string;
          uploadCsv(
            fileContent,
            () =>
              dispatch(
                setSuccessToast({
                  open: true,
                  message: "Fichier uploadé avec succès.",
                })
              ),
            () =>
              dispatch(
                setErrorToast({
                  open: true,
                  message:
                    "Une erreur est survenue lors de l'upload du fichier.",
                })
              )
          );
          handleClose();
        };
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - START_YEAR + 1 }, (_, i) => currentYear - i);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <input
        accept=".csv,.xlsx,.xls"
        style={{ display: 'none' }}
        id="upload-csv"
        type="file"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
      <label htmlFor="upload-csv">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<UploadFileIcon />}
          sx={{
            fontSize: '1.1rem',
            padding: '12px 24px',
            textTransform: 'none',
            borderRadius: '8px',
            backgroundColor: '#2A3E53', // Correspond à l'AppBar
            color: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#1f2c3a', // Gris foncé au survol
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
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
            sx={{
              backgroundColor: '#fff',
              borderRadius: '6px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#2A3E53', // Couleur qui correspond à l'AppBar
                },
                '&:hover fieldset': {
                  borderColor: '#1f2c3a', // Couleur au survol
                },
              },
            }}
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
    </div>
  );
}
