import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SignOutButton } from "./SignOutButton";

export default function MyAppBar() {
    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'rgb(211, 211, 211)', color: 'inherit' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
                <Typography variant="h6" sx={{ paddingLeft: '16px' }}>
                    LLM4Quality
                </Typography>
                <SignOutButton />
            </Toolbar>
        </AppBar>
    );
}