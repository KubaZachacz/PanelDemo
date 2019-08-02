import React from 'react';
import SaveButton from 'components/UI/SaveButton/SaveButton'
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import './SaveBar.scss';
const useStyles = makeStyles(theme => ({
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
}));

const SaveBar = ({ loading, success, isDisabled, handleSaveButton, backChangesHandler, handleClose }) => {
  const classes = useStyles();
  return (
    <Box className={classes.flexEnd}>
      <SaveButton type="submit" size="small" loading={loading} disabled={isDisabled} success={success} handleButtonClick={handleSaveButton} />
      {backChangesHandler ?
        <Button size="small" disabled={isDisabled} onClick={backChangesHandler}>Cofnij zmiany</Button>
        : null}
      <Button size="small" onClick={handleClose}>Anuluj</Button>
    </Box>
  )
};

export default SaveBar;
