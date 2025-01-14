import React from "react";
import { useQuery } from "react-query";
import { Tooltip, Typography, Box, Skeleton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CancelIcon from '@mui/icons-material/Cancel';
import { fetchCounts } from "../../../api/verbatims";
import { green, red, orange } from "@mui/material/colors";

export const useCounts = () => {
  return useQuery(["counts"], fetchCounts, {
    staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });
};

const getStatusColor = (key: string, isHover: boolean) => {
  switch (key) {
    case "success":
      return isHover ? "#2e7d32" : "green";
    case "run":
      return isHover ? "#ff9800" : "orange";
    case "error":
      return isHover ? red[600] : red[500]; ;
    default:
      return isHover ? "#9e9e9e" : "grey";
  }
};

const CountsVerbatim = () => {
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
              <Skeleton variant="circular" width={50} height={50} animation={false} sx={{display: "flex",alignItems: "center",justifyContent: "center"}}  />
            ) : (
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "grey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#9e9e9e",
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "white", fontWeight: "bold" }}
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
                <Skeleton  variant="circular" width={50} height={50} animation={false} sx={{display: "flex",alignItems: "center",justifyContent: "center"}}  />
              ) : (
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(status.key, false),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: getStatusColor(status.key, true),
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
                  <Skeleton variant="circular" width={24} height={24} animation={false} sx={{display: "flex",alignItems: "center",justifyContent: "center"}}  />
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