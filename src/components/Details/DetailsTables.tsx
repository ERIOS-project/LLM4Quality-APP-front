import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ClassificationResult from '../../models/ClassificationResult';

interface DetailsTablesProps {
  result?: ClassificationResult;
}

// Fonction utilitaire pour créer un tableau de données à partir d'un objet
const createTableData = (data: any) =>
  Object.entries(data as Record<string, { positive: 0 | 1; negative: 0 | 1 } | null>).map(([key, value]) => {
    let positive = '';
    let negative = '';
    if (value) {
      positive = value.positive === 1 ? '✔️' : '';
      negative = value.negative === 1 ? '✔️' : '';
    }
    const displayValue = value && value.positive === 0 && value.negative === 0 ? { positive: 'N/A', negative: 'N/A' } : { positive, negative };
    return {
      name: key,
      ...displayValue,
    };
  });

export default function DetailsTables({ result }: DetailsTablesProps) {
  const theme = useTheme(); // Utilisation du thème Material-UI

  if (!result) {
    return (
      <Typography variant="h6" color="textSecondary" align="center">
        Aucune donnée disponible.
      </Typography>
    );
  }

  const { qualite_hoteliere, professionnalisme_de_l_equipe, circuit_de_prise_en_charge } = result;

  const tables = [
    { title: 'Qualité Hôtelière', data: createTableData(qualite_hoteliere) },
    { title: 'Professionnalisme', data: createTableData(professionnalisme_de_l_equipe) },
    { title: 'Circuit de Prise en Charge', data: createTableData(circuit_de_prise_en_charge) },
  ];

  // Largeurs fixes pour toutes les tables
  const tableColumnWidths = {
    name: '60%',
    positive: '20%',
    negative: '20%',
  };

  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      {tables.map((table, index) => (
        <Grid key={index} size={{ xs: 11, sm: 10, md: 10, lg: 10 }} display="flex" justifyContent="center">
          <div style={{ textAlign: 'left', width: '100%' }}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              style={{
                color: theme.palette.text.primary, // Texte principal adapté au thème
                textTransform: 'uppercase',
                fontSize: '1.2rem',
              }}
            >
              {table.title}
            </Typography>
            <TableContainer
              component={Paper}
              style={{
                borderRadius: '8px',
                boxShadow: theme.shadows[2], // Ombre dynamique selon le thème
                backgroundColor: theme.palette.background.paper, // Fond adapté au thème
              }}
            >
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: theme.palette.primary.main }}> {/* Couleur principale du thème */}
                    <TableCell
                      align="center"
                      style={{
                        width: tableColumnWidths.name,
                        color: theme.palette.primary.contrastText, // Contraste pour le texte
                        fontSize: '1.2rem',
                      }}
                    >
                      <strong>Critères</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        width: tableColumnWidths.positive,
                        color: theme.palette.primary.contrastText,
                        fontSize: '1.2rem',
                      }}
                    >
                      <strong>Positif</strong>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        width: tableColumnWidths.negative,
                        color: theme.palette.primary.contrastText,
                        fontSize: '1.2rem',
                      }}
                    >
                      <strong>Négatif</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.data.map((row, idx) => (
                    <TableRow
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? theme.palette.action.hover : theme.palette.background.paper, // Alternance adaptée au thème
                      }}
                    >
                      <TableCell style={{ width: tableColumnWidths.name, fontSize: '1.2rem' }}>{row.name}</TableCell>
                      <TableCell align="center" style={{ width: tableColumnWidths.positive, fontSize: '1.2rem' }}>
                        {row.positive}
                      </TableCell>
                      <TableCell align="center" style={{ width: tableColumnWidths.negative, fontSize: '1.2rem' }}>
                        {row.negative}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
