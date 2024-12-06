import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export const SignOutButton = () => {
  const { instance } = useMsal();
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