import React from 'react';

import { Box, Tooltip, Typography, IconButton } from '@material-ui/core';
import { PowerSettingsNew, AccountCircle, Assignment } from '@material-ui/icons';

import { Link } from "react-router-dom";
//import './DesktopMenu.scss';

const DesktopMenu = ({ username, onLogout, handleProfileMenuOpen, ...props }) => (
  <>
    <Box m={2}>
      <Typography color="inherit">
        {/* <p style={ {verticalAlign: 'middle'}}>{username}</p> */}
        {username}
      </Typography>
    </Box>

    <Tooltip title="Admin panel">
      <IconButton color="inherit"
        component={Link} to="/admin"
      >
        <Assignment />
      </IconButton>
    </Tooltip>

    <Tooltip title="Profil">
      <IconButton onClick={handleProfileMenuOpen}
        aria-label="Account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Tooltip>

    <Tooltip title="Wyloguj się">
      <IconButton color="inherit"
        onClick={onLogout}
      >
        <PowerSettingsNew />
      </IconButton>

    </Tooltip>
  </>
);

export default DesktopMenu;
