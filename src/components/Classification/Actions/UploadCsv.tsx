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
import { setToast } from '../../../redux/toastSlice';
import { useThemeContext } from "../../../components/ThemeContextProvider"; // Importation du useThemeContext
import { useTheme } from '@mui/material/styles'; // Import du hook useTheme pour accéder au thème
import { AppDispatch } from '../../../redux/store';

const START_YEAR = 2000; // Année limite inférieure

interface UploadCsvProps {
  isMobile: boolean;
}

export default function UploadCsv({ isMobile }: UploadCsvProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null); 
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Utilisation du ThemeContext
  const { darkMode } = useThemeContext();
  const theme = useTheme(); // Utilisation du hook useTheme

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
      dispatch(setToast('Veuillez sélectionner une année avant de valider.', 'error'));
    } else {
      const reader = new FileReader();
      // Get the file content and upload it
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        dispatch(
          setToast('Une erreur est survenue lors de l\'upload du fichier.', 'error')
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
                setToast('Fichier uploadé avec succès.', 'success')
              ),
            () =>
              dispatch(
                setToast('Une erreur est survenue lors de l\'upload du fichier.', 'error')
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
          startIcon={!isMobile && <UploadFileIcon />} // Afficher l'icône uniquement si ce n'est pas mobile
          sx={{
            fontSize: isMobile ? '0' : '1.1rem', // Ajuster la taille de la police pour mobile
            padding: isMobile ? '12px' : '12px 24px', // Ajuster le padding pour mobile
            textTransform: 'none',
            borderRadius: isMobile ? '50%' : '8px', // Coins arrondis pour un aspect moderne ou rond pour mobile
            backgroundColor: theme.palette.primary.main,
            color: '#ffffff',
            boxShadow: darkMode ? '0 4px 8px rgba(255, 255, 255, 0.1)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: darkMode ? '#1565c0' : '#1565c0',
              boxShadow: darkMode ? '0 6px 12px rgba(255, 255, 255, 0.2)' : '0 6px 12px rgba(0, 0, 0, 0.2)',
            },
            width: isMobile ? '48px' : 'auto', // Ajuster la largeur pour mobile
            height: isMobile ? '48px' : 'auto', // Ajuster la hauteur pour mobile
            minWidth: 'auto', // Supprimer la largeur minimale par défaut
          }}
        >
          {isMobile ? <UploadFileIcon /> : 'Télécharger'} {/* Afficher l'icône au centre si mobile, sinon le texte */}
        </Button>
      </label>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: theme.palette.text.secondary }}>
          Fichier sélectionné
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.text.secondary,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <InsertDriveFileIcon color="primary" sx={{ fontSize: 60 }} />
            {fileInfo && (
              <Typography variant="body1" sx={{ mt: 1, color: theme.palette.text.secondary }}>
                <strong>Nom :</strong> {fileInfo.name}
              </Typography>
            )}
            {fileInfo && (
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                <strong>Taille :</strong> {(fileInfo.size / 1024).toFixed(2)} Ko
              </Typography>
            )}
          </Box>

          <DialogContentText sx={{ mb: 2, color: theme.palette.text.secondary }}>
            Veuillez choisir une année associée à ce fichier :
          </DialogContentText>

          <Select
            value={selectedYear}
            onChange={handleYearChange}
            displayEmpty
            fullWidth
            variant="outlined"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Limite la hauteur du menu
                  overflowY: 'auto', // Ajoute un défilement vertical si nécessaire
                },
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
            }}
            
            sx={{
              backgroundColor: darkMode ? '#333' : '#fff', // Fond dynamique
              color: theme.palette.text.secondary,
              borderRadius: '6px',
              '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.text.secondary // <------------------ utline-color on hover
              },
            }}
          >
            <MenuItem value="" disabled sx={{ color: theme.palette.text.secondary }}>
              <em>Sélectionnez une année</em>
            </MenuItem>
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year} sx={{ color: theme.palette.text.secondary }}>
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