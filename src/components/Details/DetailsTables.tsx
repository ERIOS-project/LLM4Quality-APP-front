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
import CheckIcon from '@mui/icons-material/Check';
import ClassificationResult from '../../models/ClassificationResult';
import DetailsInRun from './DetailsInRun';
import VerbatimStatus from '../../models/VerbatimStatus';

interface DetailsTablesProps {
  result?: ClassificationResult;
  status?: VerbatimStatus;
}

export default function DetailsTables({ result, status }: DetailsTablesProps) {
  const theme = useTheme(); // Utilisation du thème Material-UI

  const createTableData = (data: any) => {
    return Object.entries(data as Record<string, { positive: 0 | 1; negative: 0 | 1 } | null>).map(([key, value]) => {
      let positive: React.ReactNode = '';
      let negative: React.ReactNode = '';
      if (value) {
        positive = value.positive === 1 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CheckIcon style={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }} />
          </div>
        ) : '';
        negative = value.negative === 1 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CheckIcon style={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }} />
          </div>
        ) : '';
      }
      const displayValue = value && value.positive === 0 && value.negative === 0 ? { positive: 'N/A', negative: 'N/A' } : { positive, negative };
      return {
        name: key,
        ...displayValue,
      };
    });
  };

  if (!result) {
    if(status === VerbatimStatus.Run) {
    return (
      <DetailsInRun/>
    );
    }
    else if (status === VerbatimStatus.Error) {
      return null;
    }
    else{
      return null
    }
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
                color: theme.palette.primary.main, // Texte principal adapté au thème
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
                      <TableCell style={{ width: tableColumnWidths.name, fontSize: '1.2rem', color: theme.palette.text.secondary }}>{row.name}</TableCell>
                      <TableCell align="center" style={{ width: tableColumnWidths.positive, fontSize: '1.2rem', color: theme.palette.text.secondary }}>
                        {row.positive}
                      </TableCell>
                      <TableCell align="center" style={{ width: tableColumnWidths.negative, fontSize: '1.2rem', color: theme.palette.text.secondary }}>
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