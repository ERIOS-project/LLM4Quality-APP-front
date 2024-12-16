import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { SignOutButton } from "./SignOutButton";

export default function MyAppBar() {
    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', color: 'inherit' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SignOutButton />
            </Toolbar>
        </AppBar>
    );
}