import React from "react";
import { useQuery } from "react-query";
import { Tooltip, Typography, Box, Skeleton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchCounts } from "../../../api/verbatims";
import { useTheme } from "@mui/material/styles"; // Importation de `useTheme`
import { green, red, orange } from "@mui/material/colors";

// Hook pour récupérer les données de comptage
export const useCounts = () => {
  return useQuery(["counts"], fetchCounts, {
    staleTime: 1000 * 60 * 5, // Cache des données pendant 5 minutes
    retry: 2, // Réessayer les requêtes échouées jusqu'à 2 fois
  });
};

// Fonction pour obtenir la couleur du statut
const getStatusColor = (key: string, isHover: boolean, theme: any) => {
  if (!theme || !theme.palette) {
    return theme?.palette?.grey[400]; // Retourne une couleur par défaut si le theme ou palette est indéfini
  }

  switch (key) {
    case "success":
      return isHover ? theme.palette.success.dark : theme.palette.success.main;
    case "run":
      return isHover ? theme.palette.warning.dark : theme.palette.warning.main;
    case "error":
      return isHover ? red[600] : red[500]; // Utilise une couleur spécifique pour "error"
    default:
      return isHover ? theme.palette.grey[500] : theme.palette.grey[400];
  }
};

// Composant pour afficher les statistiques
const CountsVerbatim = () => {
  const theme = useTheme(); // Utilisation de `useTheme` pour récupérer le thème
  const { data, isLoading, error } = useCounts();

  if (error)
    return <Typography color="error">Error loading counts!</Typography>;

  const total = data?.total || 0;

  const statuses = [
    { key: "success", label: "Succès", value: data?.total_success || 0, icon: <CheckCircleIcon sx={{ fontSize: 24, color: green[500] }} /> },
    { key: "run", label: "En cours", value: data?.total_run || 0, icon: <HourglassTopIcon sx={{ fontSize: 24, color: orange[500] }} /> },
    { key: "error", label: "Erreur", value: data?.total_error || 0, icon: <CancelIcon sx={{ fontSize: 24, color: red[500] }} /> },
  ];

  return (
    <Box sx={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          alignItems: 'center',
        }}
      >
        {/* Cercle pour le total */}
        <Tooltip title={`Total: ${total}`} arrow>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{display: "flex",alignItems: "center",justifyContent: "center"}}  />
            ) : (
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.mode === 'dark' ? "#333" : "#e0e0e0", // Couleur basée sur le mode sombre/clair
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: theme.palette.mode === 'dark' ? "#555" : "#bdbdbd", // Hover effect selon le mode
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000', fontWeight: "bold" }}
                >
                  {total}
                </Typography>
              </Box>
            )}
            {/* Boîte vide pour aligner l'espace des icônes */}
            <Box sx={{ marginTop: "5px", height: "25px" }} />
          </Box>
        </Tooltip>

        {/* Cercles pour chaque statut */}
        {statuses.map((status) => (
          <Tooltip key={status.key} title={`${status.label}: ${status.value}`} arrow>
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <Skeleton variant="circular" width={50} height={50} animation="wave" sx={{display: "flex",alignItems: "center",justifyContent: "center"}}  />
              ) : (
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(status.key, false, theme), // Utilisation du `theme` dans `getStatusColor`
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: getStatusColor(status.key, true, theme), // Utilisation du `theme` dans `getStatusColor`
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {status.value}
                  </Typography>
                </Box>
              )}
              {/* Icône en dessous */}
              <Box sx={{ marginTop: "5px" }}>
                {isLoading ? (
                  <Skeleton variant="circular" width={24} height={24} animation="wave" sx={{display: "flex",alignItems: "center",justifyContent: "center"}}  />
                ) : (
                  status.icon
                )}
              </Box>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default CountsVerbatim;
