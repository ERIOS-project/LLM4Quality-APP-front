import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();

  return (
    <StyledGridOverlay>
      <h1 style={{ color: theme.palette.text.secondary }}>Aucune analyse trouvée</h1>
      <p style={{ color: theme.palette.text.secondary }}>
        Aucune analyse ne correspond aux filtres sélectionnés. Essayez de modifier vos filtres ou de commencer une nouvelle analyse.
      </p>
    </StyledGridOverlay>
  );
}