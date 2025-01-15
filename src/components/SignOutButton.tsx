import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import useTheme from '@mui/material/styles/useTheme';

export const SignOutButton = () => {
  const { instance } = useMsal();
  const theme = useTheme();
  // Function to handle logout
  const handleLogout = (logoutType: any) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <Button
      color="inherit"
      startIcon={<LogoutIcon />}
      onClick={() => handleLogout("redirect")}
    >
    </Button>
  );
};