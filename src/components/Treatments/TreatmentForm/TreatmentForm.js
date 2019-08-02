import React from 'react';
import { TextField, Checkbox, MenuItem, Box, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextValidator } from 'react-material-ui-form-validator';
import { errorTexts } from 'assets/errorTexts'
import MomentUtils from '@date-io/moment';
import clsx from 'clsx';

import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  flexBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'space-between',
    // border: '1px solid red'
  },
  flexColumn: {
    flexFlow: 'column',
  },
  form: {
    width: '100%',
  },
  fullWidth: {
    width: '100%'
  },
  leftText: {
    textAlign: 'left'
  },
  inputMargin: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },

  fixMargin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  rightMargin: {
    marginRight: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  checkbox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));


// component starts here

const TreatmentForm = ({
  handleTreatmentChange,
  handleFromChange,
  selectGroups,
  formData,
  ...props }) => {

  // const from form data
  const { TreatmentUID,
    Description,
    TreatmentDate,
    DurationInMinutes,
    OfficeID,
    IsTreatmentDone,
    IsTreatmentCancel,
    Cost,
    PaymentMethod,
    UserUID } = formData;

  const classes = useStyles();

  return (
      <>
        <Box className={classes.flexBox} >
          <Box className={clsx(classes.flexBox, classes.flexColumn, classes.inputMargin)}>
            <TextField
              id="TreatmentUID"
              label="zabieg"
              select
              disabled={formData.UID ? true : false}
              value={TreatmentUID}
              onChange={(e) => {
                handleTreatmentChange(e.target.value)
              }}
              margin="normal"
              variant="outlined"
              fullWidth
              className={clsx(classes.fixMargin, classes.leftText)}
              // helperText={"\n"}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                  variant: 'selectedMenu'
                },
              }}
            >
              {selectGroups.treatments.map(option => (
                <MenuItem key={option.UID} value={option.UID}>
                  {option.Name}
                </MenuItem>
              ))}
            </TextField>
            <Box className={classes.flexBox}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  // format="YYYY/MM/DD HH:mm"
                  format="DD/MM/YYYY HH:mm"
                  id="TreatmentDate"
                  label="data zabiegu"
                  ampm={false}
                  inputVariant="outlined"
                  cancelLabel={"ANULUJ"}
                  fullWidth
                  margin="normal"
                  className={clsx(classes.fixMargin, classes.rightMargin)}
                  value={TreatmentDate}
                  onChange={(value) => handleFromChange('TreatmentDate', value)} />
              </MuiPickersUtilsProvider>
              <TextValidator
                id="Treatmet-Duration"
                label="czas trwania"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={DurationInMinutes}
                onChange={(e) => handleFromChange('DurationInMinutes', e.target.value)}
                margin="normal"
                variant="outlined"
                className={classes.fixMargin}
                fullWidth
                validators={['required']}
                errorMessages={[errorTexts.required]}
                helperText={"\n"}
              />
            </Box>
          </Box>
          <Box className={clsx(classes.fullWidth, classes.inputMargin)}>
            <TextValidator
              id="Description"
              label="opis"
              multiline
              rows="5"
              value={Description}
              onChange={(e) => handleFromChange('Description', e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              className={clsx(classes.fixMargin)}
              validators={['required']}
              errorMessages={[errorTexts.required]}
              helperText={"\n"}
            />
          </Box>
        </Box>
        <Box className={classes.flexBox}>
          <TextField
            id="UserUID"
            label="pracownik"
            select
            value={UserUID}
            onChange={(e) => handleFromChange('UserUID', e.target.value)}
            margin="normal"
            variant="outlined"
            className={clsx(classes.inputMargin, classes.leftText)}
            fullWidth
            helperText={"\n"}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
                variant: 'selectedMenu'
              },
            }}
          >
            {selectGroups.users.map(option => (
              <MenuItem key={option.UID} value={option.UID}>
                {option.FullName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="OfficeID"
            label="gabinet"
            select
            value={OfficeID}
            onChange={(e) => handleFromChange('OfficeID', e.target.value)}
            margin="normal"
            variant="outlined"
            className={clsx(classes.inputMargin, classes.leftText)}
            fullWidth
            helperText={"\n"}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
                variant: 'selectedMenu'
              },
            }}
          >
            {selectGroups.offices.map(option => (
              <MenuItem key={option.OfficeID} value={option.OfficeID}>
                {option.OfficeName}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box className={classes.flexBox}>
          <TextValidator
            id="Treatmet-Price"
            label="cena"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            value={Cost}
            onChange={(e) => handleFromChange('Cost', e.target.value)}
            margin="normal"
            variant="outlined"
            className={classes.inputMargin}
            fullWidth
            validators={['required']}
            errorMessages={[errorTexts.required]}
            helperText={"\n"}
          />

          <Box className={clsx(classes.flexBox, classes.inputMargin)}>
            {IsTreatmentCancel ? null : <Box className={classes.checkbox}>
              <FormControlLabel
                labelPlacement="end"
                label="Wykonano"
                control={
                  <Checkbox
                    color='primary'
                    checked={IsTreatmentDone}
                    onChange={(e) => handleFromChange('IsTreatmentDone', e.target.checked)}
                    value="IsTreatmentDone"
                    inputProps={{
                      'aria-label': 'IsTreatmentDone checkbox',
                    }}
                  />
                }
              />
            </Box>}
            {IsTreatmentDone ? null : <Box className={classes.checkbox}>
              <FormControlLabel
                labelPlacement="end"
                label="Odwołano"
                control={
                  <Checkbox
                    color='primary'
                    checked={IsTreatmentCancel}
                    onChange={(e) => handleFromChange('IsTreatmentCancel', e.target.checked)}
                    value="IsTreatmentCancel"
                    inputProps={{
                      'aria-label': 'IsTreatmentCancel checkbox',
                    }}
                  />
                }
              />
            </Box>}
          </Box>
        </Box>
      </>
  )
};

export default TreatmentForm;
