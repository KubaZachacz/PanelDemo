import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Container} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modalPaper: {
    width: '100%',
    maxWidth: theme.breakpoints.values.lg,
    position: 'absolute',
    boxShadow: theme.shadows[5],
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    [theme.breakpoints.down('lg')]: {
      width: 'calc(100% - 24px)',
    },
  },
}));

const CustomModal = ({ onClose, open, children}) => {
  const classes = useStyles();
  return(
    <Modal onClose={onClose} aria-labelledby="okno-edycji-produktów-zabiegu" open={open} id="edit-treatment-products-modal">
      <Container maxWidth='lg'>
        <Paper className={classes.modalPaper}>
          {children}
        </Paper>
      </Container>
    </Modal>
)};

export default CustomModal;
