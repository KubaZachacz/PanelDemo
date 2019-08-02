import React from 'react';

import { Menu, MenuItem, IconButton, Typography } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
//import './UserSubmenu.scss';

const UserSubmenu = ({ anchorEl, submenuId, isSubmenuOpen, handleSubmenuClose, ...props }) => (
  <Menu
    anchorEl={anchorEl}
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    id={submenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={isSubmenuOpen}
    onClose={handleSubmenuClose}
    color='primary'
  >
    <MenuItem
      disabled
    >
      <Typography color="inherit">
       Ustawienia konta
      </Typography>
    </MenuItem>
    <MenuItem>
      <IconButton>
        <Settings />
      </IconButton>
      <p>Zmień hasło</p>
    </MenuItem>
  </Menu>
);

export default UserSubmenu;
