import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { Close, PersonAdd } from '@material-ui/icons';
import { ListItemIcon } from '@material-ui/core';

//import './CustomerModal.scss';
const useStyles = makeStyles(theme => ({
  dialogTitle: {
    fontSize: '36px !important',
    color: 'red'
  }
}));

const TreatmentActionPopup = (props) => {
  const { onClose, selectedValue, addNew,openAdded, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }
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
        <ListItem button onClick={addNew}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText primary={<Typography >Dodaj nowy zabieg</Typography>} />
        </ListItem>
      </List>
    </Dialog >
  )
};

export default TreatmentActionPopup;
