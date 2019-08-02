import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from 'containers/SearchBar/SearchBar';
import Customer from 'components/Customer/Customer';
import Treatments from 'components/Treatments/Treatments';

// import DefineTreatmentForm from 'components/DefineTreatmentForm/DefineTreatmentForm'

import Calendar from 'containers/Calendar/Calendar';
import { withStyles } from '@material-ui/core/styles';
import { Container, Collapse, Box, Toolbar } from '@material-ui/core';

import axios from 'axios';
import * as URL from 'assets/urls.js'

import './MainPage.scss';
import { setForm } from '../../store/actions/actions';

const styles = {
  Paper: {
    minHeight: '100vh'
  }
};

class MainPage extends Component {

  state = {
    isCustomerOpen: false,
    isCustomerSearched: false,
  }

  customerData = null;

  handlePhraze = (inputData, phraze) => {
    const phrazeArr = phraze.split(" ")
    const data = {
      ...inputData,
      name: phrazeArr[0] ? phrazeArr[0] : '',
      secondName: phrazeArr[1] ? phrazeArr[1] : '',
    }
    return data
  }

  openCustomerHandler = () => {
    this.setState({
      isCustomerOpen: true
    })
  }

  closeCustomerHandler = () => {
    console.log('close')
    this.setState({
      isCustomerOpen: false
    })
  }

  addNewHandler = (phraze) => {
    // this.customerData = null;
    this.props.setFormData('customerForm', null);
    // this.customerData = { newClient: true };
    // if (phraze) this.customerData = { ...this.handlePhraze({ newClient: true }, phraze) };
    this.openCustomerHandler();
    this.setState({
      isCustomerSearched: false
    })
  }

  backChangesHandler = (form) => {
    this.props.setFormData(form, this.props.formsStateCopy[form]);
  }

  searchHandler = (UID) => {
    axios.get(URL.clientsWithStats + '/' + UID)
      .then(res => {
        if (res.data) {
          const customerData = {
            ...res.data,
            Birthday: res.data.Birthday.slice(0, 10)
          }
          this.props.setFormData('customerForm', customerData);
          console.log(customerData)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    this.openCustomerHandler();
    this.setState({
      isCustomerSearched: true
    })

  }

  render() {
    const classes = this.props.classes;
    const { isCustomerOpen, isCustomerSearched } = this.state;

    return (
      <div className="MainPage">

        <Container maxWidth="lg">
          <SearchBar
            addCustomer={this.addNewHandler}
            onSearch={this.searchHandler}
          />
          <Collapse in={isCustomerOpen} style={{ marginBottom: '24px' }}>
            <Customer
              isCustomerOpen={isCustomerOpen}
              isCustomerSearched={isCustomerSearched}
              closeCustomer={this.closeCustomerHandler}
              openAdded={this.searchHandler}
              backChanges={this.backChangesHandler}
            />
            {isCustomerOpen && isCustomerSearched ? <Treatments
              isCustomerOpen={isCustomerOpen}
              closeCustomer={this.closeCustomerHandler}
            /> : null}

          </Collapse>


          <Calendar />
        </Container>

      </div >
    );
  }
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
)(withStyles(styles)(MainPage));
