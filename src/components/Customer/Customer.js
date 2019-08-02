import React, { useState } from 'react';
import { connect } from 'react-redux'
import CustomerForm from 'components/Customer/CustomerForm/CustomerForm';
import SaveButton from 'components/UI/SaveButton/SaveButton'
import CustomerModal from 'components/Customer/CustomerModal/CustomerModal'
import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions, Typography, Button, Divider, Tooltip, IconButton } from '@material-ui/core/';
import { ExpandMore, Close } from '@material-ui/icons';
import { ValidatorForm } from 'react-material-ui-form-validator';
//import './Customer.scss';
import { setForm } from '../../store/actions/actions';
import axios from 'axios';
import * as URL from 'assets/urls.js'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 20
  },
  form: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  headingButton: {
    padding: theme.spacing(1),
    float: 'right'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontWeight: 700
  },
  panelContent: {
    margin: 0,
    alignItems: 'center'
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));


const Customer = ({ isCustomerOpen, isCustomerSearched, backChanges, closeCustomer, customerData, clearFormData, openAdded }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [headingText, setHeadingText] = useState("Nowy klient");
  const [isExpanded, setExpanded] = useState(false);
  const [addedUID, setAddedUID] = useState(false);
  const ref = React.createRef()

  React.useEffect(() => {
    setSuccess(false);
    setLoading(false);
    ref.current.resetValidations();
    if (customerData.UID) {
      setHeadingText(<>{`${customerData.FirstName} ${customerData.LastName}`}</>)
      setExpanded(false)
    }
    else {
      setHeadingText("Nowy kient")
      setExpanded(true)
    }
  }, [isCustomerOpen, customerData.UID]);

  const handleSaveButton = async () => {
    const isFormValid = await ref.current.isFormValid(false)

    if (isFormValid) {
      setSuccess(false);
      setLoading(true);

      const sendUrl = `${URL.clients}${customerData.UID ? `/${customerData.UID}` : ''}`

      if (customerData.UID) {
        axios.put(sendUrl, customerData)
          .then(function (response) {
            setSuccess(true);
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
        axios.post(sendUrl, customerData)
          .then(function (response) {
            setSuccess(true);
            setLoading(false);
            handleClickOpen();
            setAddedUID(response.data.UID)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = value => {
    setOpen(false);
    closeCustomer();
  };

  const addAgainCustomer = () => {
    setOpen(false);
    setSuccess(false);
    setLoading(false);
    clearFormData();
  }

  const openAddedHandler = () => {
    setOpen(false);
    openAdded(addedUID)

  }

  const handleSubmit = () => {
    // your submit logic
  }

  return (

    <ExpansionPanel defaultExpanded={false} expanded={isExpanded} onChange={() => setExpanded(!isExpanded)}>

      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel-klient"
        id="panel-klient"
        classes={{ content: classes.panelContent }}
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>Klient</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>{headingText}</Typography>
        </div>
        <div className={classes.column}>
          <Tooltip title="Zamknij"><IconButton className={classes.headingButton} size='small' onClick={closeCustomer}><Close /></IconButton></Tooltip>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <ValidatorForm
          className={classes.form}
          ref={ref}
          onSubmit={handleSubmit}
          onError={errors => console.log(errors)}>
          <CustomerForm customerData={customerData} />
        </ValidatorForm>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <SaveButton type="submit" size="small" loading={loading} disabled={!customerData.isEdited} success={success} handleButtonClick={handleSaveButton} />
        <Button size="small" disabled={!customerData.isEdited} onClick={()=>backChanges('customerForm')}>Cofnij zmiany</Button>
        {customerData.UID ? null : <Button size="small" onClick={closeCustomer}>Anuluj</Button>}
        <CustomerModal open={open} openAdded={openAddedHandler} onClose={handleClose} addNew={addAgainCustomer} />
      </ExpansionPanelActions>
    </ExpansionPanel>


  )
};
const mapStateToProps = state => {
  return {
    customerData: state.customerForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFormData: () => dispatch(setForm('customerForm', null)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
