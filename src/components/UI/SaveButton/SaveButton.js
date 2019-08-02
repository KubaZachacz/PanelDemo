import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
//import './SaveButton.scss';

const progresSizes = {
  small: 52,
  medium: 60,
  large: 68
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const SaveButton = ({ size, success, loading, handleButtonClick, disabled, ...props }) => {
  const classes = useStyles();


  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });



  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="Save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
          size={size}
          disabled={disabled}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={progresSizes[size]} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant={success ? "contained" : "outlined"}
          color="primary"
          className={buttonClassname}
          disabled={loading || disabled}
          onClick={handleButtonClick}
          size={size}
        >
          Zapisz
        </Button>
        {loading && <CircularProgress size={22} className={classes.buttonProgress} />}
      </div>
    </div>
  )
};

export default SaveButton;
