import React, { useState } from 'react';
import { connect } from 'react-redux';

import SearchBar from 'containers/SearchBar/SearchBar';
import Customer from 'components/Customer/Customer';
import Treatments from 'components/Treatments/Treatments';
import CustomModal from 'components/UI/CustomModal/CustomModal'

import Calendar from 'containers/Calendar/Calendar';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Collapse, IconButton, Box, Typography } from '@material-ui/core';

import axios from 'axios';
import * as URL from 'assets/urls.js'

import './MainPage.scss';
import { setForm } from '../../store/actions/actions';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  Paper: {
    minHeight: '100vh'
  },
  modalText: {
    textAlign: "center",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 400
  }
}));

const MainPage = ({ setFormData, formsStateCopy }) => {
  const classes = useStyles();
  const [isCustomerOpen, setCustomerOpen] = useState(false)
  const [isCustomerSearched, setCustomerSearched] = useState(false)
  const [infoOpen, setOpen] = useState(true);

  const openCustomerHandler = () => {
    setCustomerOpen(true)
  }

  const closeCustomerHandler = () => {
    setCustomerOpen(false)
    setFormData('customerForm', null);
  }

  const addNewHandler = (phraze) => {
    setFormData('customerForm', null);
    openCustomerHandler();
    setCustomerSearched(false)
  }

  const backChangesHandler = (form) => {
    setFormData(form, formsStateCopy[form]);
  }

  const updateCustomerStats = (UID) => {
    axios.get(URL.clientsStats + '/' + UID)
      .then(res => {
        if (res.data) {
          setFormData('customerStats', res.data)
        }
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const searchHandler = (UID) => {
    axios.get(URL.clients + '/' + UID)
      .then(res => {
        if (res.data) {
          const customerData = {
            ...res.data,
            Birthday: res.data.Birthday ? res.data.Birthday.slice(0, 10) : 0
          }
          setFormData('customerForm', customerData);
        }
      })

    openCustomerHandler();
    setCustomerSearched(true)
    updateCustomerStats(UID);
  }

  return (
    <div className="MainPage">

      <Container maxWidth="lg">
        <SearchBar
          addCustomer={addNewHandler}
          onSearch={searchHandler}
        />
        <Collapse in={isCustomerOpen} style={{ marginBottom: '24px' }}>
          <Customer
            isCustomerOpen={isCustomerOpen}
            isCustomerSearched={isCustomerSearched}
            closeCustomer={closeCustomerHandler}
            openAdded={searchHandler}
            backChanges={backChangesHandler}
          />
          {isCustomerOpen && isCustomerSearched ? <Treatments
            updateCustomerStats={updateCustomerStats}
            isCustomerOpen={isCustomerOpen}
            closeCustomer={closeCustomerHandler}
          /> : null}

        </Collapse>
        <Calendar />
      </Container>
      <CustomModal open={infoOpen} onClose={handleClose}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}><Close /></IconButton>
        </Box>
        <Box>
          <Typography variant="h5" className={classes.modalText}>
            Wersja demonstracyjna panelu do zarządzania bazą danych, który został stworzy dla kliniki piękności.
          </Typography>
          <Typography variant="h6" className={classes.modalText}>
            Jest to zmodyfikowana kopia akutalnie rozwijanego serwisu i przedstawia jego podstawowe funkcje.<br/>Postawała we frameforku React JS z wykorzystaniem biblioteki Material-UI.<br/>
            Zapraszamy do testowania!
          </Typography>
          <Typography variant="h6" className={classes.modalText}>
            W razie pytań i uwag proszę o kontakt <a style={{ color: "inherit" }} href="mailto:zachacz.jakub@gmail.com">zachacz.jakub@gmail.com</a> <a style={{ color: "inherit" }} href="mailto:https://github.com/kubazachacz">https://github.com/kubazachacz</a>
          </Typography>
        </Box>
      </CustomModal>
    </div >
  );
}

const mapStateToProps = state => ({
  formsStateCopy: state.formsStateCopy
});

const mapDispatchToProps = dispatch => ({
  setFormData: (form, data) => dispatch(setForm(form, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
