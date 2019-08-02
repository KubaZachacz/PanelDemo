import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { textAlign } from '@material-ui/system';
import { Close, PersonAdd, Person } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';

//import './CustomerModal.scss';
const useStyles = makeStyles(theme => ({
  dialogTitle: {
    fontSize: '36px !important',
    color: 'red'
  }
}));

const CustomerModal = (props) => {
  const { onClose, selectedValue, addNew,openAdded, ...other } = props;
  const classes = useStyles();

  function handleClose() {
    onClose(selectedValue);
  }

  // classes={{ root: classes.dialogTitle }} 

  return (
    <Dialog onClose={handleClose} aria-labelledby="okno-wyboru-akcji-po-zapisaniu" {...other}>
      <DialogTitle id="after-save-action"><Typography style={{ whiteSpace: 'pre-line', fontWeight: 700, textAlign: "center", fontSize:'1.2em' }}>{"Zapisano pomyślnie.\nCo zrobić dalej?"}</Typography></DialogTitle>
      <List>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <Close />
          </ListItemIcon>

          <ListItemText primary={<Typography>Zamknij</Typography>} />
        </ListItem>
        <ListItem button onClick={openAdded}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={<Typography >Otwórz klienta</Typography>} />
        </ListItem>
        <ListItem button onClick={addNew}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary={<Typography >Dodaj nowego</Typography>} />
        </ListItem>
      </List>
    </Dialog >
  )
};

export default CustomerModal;
