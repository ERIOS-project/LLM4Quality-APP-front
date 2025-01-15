import "./App.css";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { loginRequest } from './authConfig';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MyAppBar from "./components/AppBar";
import VerbatimClassification from "./pages/VerbatimClassification";
import VerbatimDetails from "./pages/VerbatimDetails"; 
import ToastManager from "./components/ToastManager";
import DarkModeToggle from "./components/DarkModeToggle";
import { Box, useTheme } from '@mui/material';

const LoginRedirect = () => {
  const { instance } = useMsal();
  useEffect(() => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  }, [instance]);

  return null; 
};

export default function App() {
  const { instance } = useMsal();
  const theme = useTheme(); // Accéder au thème actuel

  return (
    <Box
      sx={{
        minHeight: '100vh', // Prendre toute la hauteur de la page
        bgcolor: theme.palette.background.default, // Utiliser la couleur de fond du thème
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AuthenticatedTemplate>
        <MyAppBar />
        <DarkModeToggle />
        <Provider store={store}>
          <Box className="body" sx={{ flex: 1 }}> {/* Flex: 1 pour remplir l'espace restant */}
            <Routes>
              <Route path='/' element={<VerbatimClassification />} />
              <Route path='/details/:id' element={<VerbatimDetails />} />
            </Routes>
            <ToastManager />
          </Box>
        </Provider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginRedirect />
      </UnauthenticatedTemplate>
    </Box>
  );
}
