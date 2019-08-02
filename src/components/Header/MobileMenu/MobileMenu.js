import React from 'react';

import './MobileMenu.scss';
import { Menu, MenuItem, Typography, IconButton } from '@material-ui/core';
import { PowerSettingsNew, AccountCircle, Assignment } from '@material-ui/icons';

import { Link } from "react-router-dom";

const MobileMenu = ({ username, onLogout, mobileMoreAnchorEl, mobileMenuId, isMobileMenuOpen, handleMobileMenuClose, handleProfileMenuOpen }) => (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <MenuItem
      disabled
    >
      <Typography color="inherit">
        {username}
      </Typography>
    </MenuItem>
    <MenuItem component={Link} to="/admin">
      <IconButton color="inherit">
        <Assignment />
      </IconButton>
      <p>Admin panel</p>
    </MenuItem>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
        aria-label="Account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <p>Profil</p>
    </MenuItem>
    <MenuItem
    onClick={onLogout}
    >
      <IconButton color="inherit">
        <PowerSettingsNew />
      </IconButton>
      <p>Wyloguj się</p>
    </MenuItem>
  </Menu>
);

export default MobileMenu;
