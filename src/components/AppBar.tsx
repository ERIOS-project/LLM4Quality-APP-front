import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { SignOutButton } from "./SignOutButton";

export default function MyAppBar() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SignOutButton />
            </Toolbar>
        </AppBar>
    );
}