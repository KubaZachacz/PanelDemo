import React, { useState } from 'react';
import { connect } from 'react-redux';

import SearchBar from 'containers/SearchBar/SearchBar';
import Customer from 'components/Customer/Customer';
import Treatments from 'components/Treatments/Treatments';

// import DefineTreatmentForm from 'components/DefineTreatmentForm/DefineTreatmentForm'

import Calendar from 'containers/Calendar/Calendar';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Collapse } from '@material-ui/core';

import axios from 'axios';
import * as URL from 'assets/urls.js'

import './MainPage.scss';
import { setForm } from '../../store/actions/actions';

const useStyles = makeStyles(theme => ({
  Paper: {
    minHeight: '100vh'
  }
}));

const MainPage = ({ setFormData, formsStateCopy }) => {
  const classes = useStyles();
  const [isCustomerOpen, setCustomerOpen] = useState(false)
  const [isCustomerSearched, setCustomerSearched] = useState(false)

  const handlePhraze = (inputData, phraze) => {
    const phrazeArr = phraze.split(" ")
    const data = {
      ...inputData,
      name: phrazeArr[0] ? phrazeArr[0] : '',
      secondName: phrazeArr[1] ? phrazeArr[1] : '',
    }
    return data
  }

  const openCustomerHandler = () => {
    setCustomerOpen(true)
  }

  const closeCustomerHandler = () => {
    setCustomerOpen(false)
    setFormData('customerForm', null);
  }

  const addNewHandler = (phraze) => {
    // this.customerData = null;
    setFormData('customerForm', null);
    // this.customerData = { newClient: true };
    // if (phraze) this.customerData = { ...this.handlePhraze({ newClient: true }, phraze) };
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

  const searchHandler = (UID) => {
    axios.get(URL.clients + '/' + UID)
      .then(res => {
        if (res.data) {
          const customerData = {
            ...res.data,
            Birthday: res.data.Birthday.slice(0, 10)
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
