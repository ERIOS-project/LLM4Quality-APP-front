import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useTheme } from '@mui/material/styles'; // Import du hook useTheme pour accéder au thème

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles?.('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles?.('light', {
      fill: '#E8EAED',
    }),
  },
}));

export default function CustomNoRowsOverlay() {
  const theme = useTheme(); // Utilisation du thème Material-UI

  return (
    <StyledGridOverlay>
      <Box sx={{ mt: 2, textAlign: 'center', color: theme.palette.text.secondary }}>
        <h1 style={{ color: theme.palette.text.secondary }}>
          Pour débuter l'analyse des verbatims :
        </h1>
        <ol style={{ textAlign: 'left', color: theme.palette.text.secondary }}>
          <li style={{ marginBottom: 4 }}>
            Cliquez sur le bouton télécharger&nbsp;
            <UploadFileIcon sx={{ verticalAlign: 'middle', color: theme.palette.text.secondary }} />
          </li>
          <li style={{ marginBottom: 8 }}>Sélectionnez votre fichier au format .csv</li>
          <li style={{ marginBottom: 8 }}>Choisissez l'année correspondant aux verbatims</li>
          <li style={{ marginBottom: 8 }}>Cliquez sur "Valider"</li>
          <li style={{ marginBottom: 8 }}>Patientez pendant l'analyse de vos verbatims</li>
        </ol>
      </Box>
    </StyledGridOverlay>
  );
}
