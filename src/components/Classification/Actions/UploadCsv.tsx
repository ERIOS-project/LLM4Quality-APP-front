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
  IconButton
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { uploadCsv } from '../../../api/websockets/csv';
import { setSuccessToast, setErrorToast } from '../../../redux/toastSlice';
import { useThemeContext } from "../../../components/ThemeContextProvider"; // Importation du useThemeContext

const START_YEAR = 2000; // Année limite inférieure

export default function UploadCsv() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null); 
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Utilisation du ThemeContext
  const { darkMode } = useThemeContext();

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
            selectedYear,
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
            backgroundColor: darkMode ? '#1976d2' : '#1976d2', // Maintien la même couleur pour le bouton
            color: '#ffffff',
            boxShadow: darkMode ? '0 4px 8px rgba(255, 255, 255, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: darkMode ? '#1565c0' : '#1565c0',
              boxShadow: darkMode ? '0 6px 12px rgba(255, 255, 255, 0.2)' : '0 6px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          Télécharger
        </Button>
      </label>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Fichier sélectionné
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
              backgroundColor: darkMode ? '#333' : '#fff', // Fond dynamique
              borderRadius: '6px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? '#444' : '#2A3E53', // Bordure dynamique
                },
                '&:hover fieldset': {
                  borderColor: darkMode ? '#666' : '#1f2c3a', // Bordure au survol
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
    </Box>
  );
}
