import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Container, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CustomTable from 'components/CustomTable/CustomTable'
import * as inputs from 'components/CustomTable/Inputs'

import TreatmentsTable from 'components/TreatmentsTable/TreatmentsTable'

import axios from 'axios';
import * as URL from 'assets/urls.js'

const columns = {
  treatments: [
    { title: 'Zabieg', field: 'Name', editComponent: inputs.InputFieldText, defaultSort: 'asc' },
    { title: 'Opis', field: 'Description', editComponent: inputs.InputFieldText },
    { title: 'Czas trwania', field: 'DurationInMinutes', editComponent: inputs.InputFieldNumber },
    { title: 'Cena', field: 'Cost', type: 'numeric', editComponent: inputs.InputFieldNumber },
  ],
  users: [
    { title: 'Imię', field: 'FirstName', editComponent: inputs.InputFieldText, defaultSort: 'asc' },
    { title: 'Nazwisko', field: 'LastName', editComponent: inputs.InputFieldText },
    { title: 'Nr tel', field: 'PhoneNumber', editComponent: inputs.InputFieldPhone },
    { title: 'E-mail', field: 'Email', editComponent: inputs.InputFieldEmail },
    { title: 'Stopień', field: 'Permission', editComponent: inputs.InputFieldText },
    { title: 'Aktywny', field: 'Active', type: "boolean" },
    { title: 'Login', field: 'Login', editComponent: inputs.InputFieldText },
    { title: 'Hasło', field: 'Password', editComponent: inputs.InputFieldPassword },
  ],
  offices: [
    { title: 'Gabinet', field: 'OfficeName', editComponent: inputs.InputFieldText, defaultSort: 'asc' },
    { title: 'Aktywny', field: 'Active', type: "boolean" }
  ],
  groups: [
    { title: 'Grupa', field: 'GroupName', editComponent: inputs.InputFieldText },
    { title: 'Zniżka [%]', field: 'Discount', type: 'numeric', editComponent: inputs.InputFieldNumber, defaultSort: 'desc' },
    { title: 'Aktywny', field: 'Active', type: "boolean" }
  ],
  products: [
    { title: 'Produkt', field: 'Name', editComponent: inputs.InputFieldText },
    { title: 'Ilość', field: 'Quantity', type: 'numeric', editComponent: inputs.InputFieldNumber },
    { title: 'Jednostka', field: 'Unit', lookup: { ml: 'ml', szt: 'szt', g: 'g' } }
  ],
  treatmentProducts: [
    { title: 'Produkt', field: 'Name' },
    { title: 'Potrzebna ilość', field: 'Quantity', type: 'numeric', editComponent: inputs.InputFieldNumber },
    { title: 'Jednostka', field: 'Unit' }
  ]
}

//import './AdminPage.scss';
const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingTop: theme.spacing(3)
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: '700',
  },
}));

const AdminPage = ({ refreshProducts }) => {
  const classes = useStyles();

  return (
    <div className="AdminPage">
      <Container maxWidth="lg" className={classes.mainContainer}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="edycja-zabiegów-panel"
            id="edycja-zabiegów-panel"
          >
            <Typography className={classes.heading}>Lista zabiegów</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TreatmentsTable
              columns={columns.treatments}
              URL={URL.adminTreatments}
              subURL={URL.adminTreatmentProducts}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="edycja-produktów-panel"
            id="edycja-produktów-panel"
          >
            <Typography className={classes.heading}>Lista produktów</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CustomTable
              columns={columns.products}
              URL={URL.adminProducts}
              extraSaveFunction={refreshProducts}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="edycja-użytkowników-panel"
            id="edycja-zabiegów-panel"
          >
            <Typography className={classes.heading}>Lista użytkoników</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CustomTable
              columns={columns.users}
              URL={URL.adminUsers} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="edycja-gabinetów-panel"
            id="edycja-gabinetów-panel"
          >
            <Typography className={classes.heading}>Lista gabinetów</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CustomTable
              columns={columns.offices}
              URL={URL.adminOffices} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="edycja-grup-panel"
            id="edycja-grup-panel"
          >
            <Typography className={classes.heading}>Lista grup klientów</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CustomTable
              columns={columns.groups}
              URL={URL.adminGroups} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    </div>
  )
};

const mapStateToProps = state => ({
  refreshProducts: state.refreshTreatmentTableFn,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminPage);
