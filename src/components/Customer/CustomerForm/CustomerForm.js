import React from 'react';
import { connect } from 'react-redux'
import { updateForm } from 'store/actions/actions'

import { Button, List, ListItem, Avatar, TextField, Checkbox, Typography, MenuItem, Box, FormControlLabel } from '@material-ui/core';
import { AccountCircleOutlined, PermPhoneMsgOutlined, WorkOutline, Chat, Cake } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { TextValidator } from 'react-material-ui-form-validator';
// import { MoreIcon } from '@material-ui/icons';
import axios from 'axios';
import * as URL from 'assets/urls.js'
import { errorTexts } from 'assets/errorTexts'

//import './Customer.scss';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  textField: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  icon: {
    marginBottom: theme.spacing(3),
  },
  box: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu: {
    width: 200,
  },
}));

const groups = [
  {
    value: 'Grupa1',
    label: 'Grupa1'
  },
  {
    value: 'Grupa2',
    label: 'Grupa2'
  },
  {
    value: 'Grupa3',
    label: 'Grupa3'
  },
]

const Customer = ({ clearFormTrigger,
  customerData,
  handleFromChange,
  FirstName,
  LastName,
  Birthday,
  Group,
  PhoneNumber,
  Email,
  Company,
  TaxNumber,
  PromotialInfoAgreement,
  ...props }) => {

  const classes = useStyles();

  const [groups, setGroups] = React.useState([])
  React.useEffect(()=>{
    axios.get(URL.groups, customerData)
    .then(function (response) {
      setGroups(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <AccountCircleOutlined className={classes.icon} />
          <TextValidator
            id="FirstName"
            label="imię"
            value={FirstName}
            onChange={(e) => handleFromChange('FirstName', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            fullWidth
            validators={['required']}
            errorMessages={[errorTexts.required]}
            helperText={"\n"}
          />
          <TextValidator
            id="LastName"
            label="nazwisko"
            value={LastName}
            onChange={(e) => handleFromChange('LastName', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            fullWidth
            validators={['required']}
            errorMessages={[errorTexts.required]}
            helperText={"\n"}
          />
        </ListItem>
        <ListItem>
          <PermPhoneMsgOutlined className={classes.icon} />

          <TextValidator
            id="PhoneNumber"
            label="nr. telefonu"
            value={PhoneNumber}
            onChange={(e) => handleFromChange('PhoneNumber', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            fullWidth
            validators={['required', 'matchRegexp:^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$']}
            errorMessages={[errorTexts.required, errorTexts.PhoneNumber]}
            helperText={"\n"}
          />
          <TextValidator
            id="Email"
            label="e-mail"
            value={Email}
            onChange={(e) => handleFromChange('Email', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            fullWidth
            validators={['required', 'isEmail']}
            errorMessages={[errorTexts.required, errorTexts.Email]}
            helperText={"\n"}
          />
        </ListItem>
        <ListItem>
          <Cake className={classes.icon} />
          <TextField
            id="Birthday"
            label="urodziny"
            type="date"
            value={Birthday}
            onChange={(e) => handleFromChange('Birthday', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            helperText={"\n"}
          />
          <TextField
            id="Group"
            label="grupa"
            select
            value={Group}
            onChange={(e) => handleFromChange('Group', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            fullWidth
            helperText={"\n"}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            {groups.map(option => (
              <MenuItem key={option.GroupID} value={option.GroupID}>
                {option.GroupName}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>
        <ListItem>
          <WorkOutline className={classes.icon} />
          <TextValidator
            id="Company"
            label="firma"
            value={Company}
            onChange={(e) => handleFromChange('Company', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            fullWidth
            helperText={"\n"}
          />
          <TextValidator
            id="TaxNumber"
            label="nip"
            value={TaxNumber}
            onChange={(e) => handleFromChange('TaxNumber', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            fullWidth
            helperText={"\n"}
            validators={['isNumber']}
            errorMessages={[errorTexts.TaxNumber,]}
          />
        </ListItem>
        <ListItem>
          <Chat className={classes.icon} />
          <Box className={classes.box}>
            <FormControlLabel
              labelPlacement="end"
              label="Zgoda na wysyłanie materiałów promocyjnych"
              control={
                <Checkbox
                  color='primary'
                  checked={PromotialInfoAgreement}
                  onChange={(e) => handleFromChange('PromotialInfoAgreement', e.target.checked)}
                  value="PromotialInfoAgreement"
                  inputProps={{
                    'aria-label': 'PromotialInfoAgreement checkbox',
                  }}
                />
              }
            />
          </Box>
        </ListItem>
      </List>
    </div >
  )
};

const mapStateToProps = state => {
  return {
    ...state.customerForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFromChange: (field, value) => dispatch(updateForm('customerForm', field, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
