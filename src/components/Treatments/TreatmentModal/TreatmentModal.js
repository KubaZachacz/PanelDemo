import React, { useState } from 'react';
import { connect } from 'react-redux'
import { updateForm, setForm, setTable } from 'store/actions/actions'
import SaveBar from 'components/UI/SaveBar/SaveBar'
import { Paper, Divider, Box, Typography, Modal, Container, IconButton, Tooltip, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { ValidatorForm } from 'react-material-ui-form-validator';
import moment from 'moment';
import TreatmentProductsTable from 'components/TreatmentProductsTable/TreatmentProductsTable'
import TreatmentActionPopup from 'components/Treatments/TreatmentActionPopup/TreatmentActionPopup'
import TreatmentForm from 'components/Treatments/TreatmentForm/TreatmentForm'
import TreatmentHistory from 'components/Treatments/TreatmentHistory/TreatmentHistory'
import SearchBar from 'containers/SearchBar/SearchBar';
import { Close, NotificationImportant } from '@material-ui/icons';
import clsx from 'clsx';

import axios from 'axios';
import * as URL from 'assets/urls.js'
//import './TreatmentForm.scss';

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
    // height: '100%',
    // alignItems: 'stretch',
  },
  form: {
    width: '100%',
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start'
  },
  fullWidth: {
    width: '100%'
  },
  withPadding: {
    padding: '16px 0'
  },
  leftText: {
    textAlign: 'left'
  },
  formHeading: {
    display: 'flex',
    alignItems: 'center',
  },
  headingTextTop: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  headingText: {
    display: 'block',
    textAlign: 'left',
    // marginBottom: theme.spacing(1),
    margin: `${theme.spacing(1)}px ${theme.spacing(3)}px`
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
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
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
  searchBar: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.grey[400],
    boxShadow: 'none',
    '&:hover': {
      borderColor: theme.palette.grey[900],
    }
  }
}));

const getData = (URL) => {
  return new Promise(resolve => {
    axios.get(URL)
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(function (error) {
        resolve(null)
      });
  });
}

const postData = (URL, data) => {
  return new Promise(resolve => {
    axios.post(URL, data)
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(function (error) {
        resolve(null)
      });
  });
}

const putData = (URL, data) => {
  return new Promise(resolve => {
    axios.put(URL, data)
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(function (error) {
        resolve(null)
      });
  });
}

function a11yProps(index) {
  return {
    id: `zabieg-zakładka-${index}`,
    'aria-controls': `zabieg-panel-${index}`,
  };
}


const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      {...other}
      id={`zabieg-panel-${index}`}
      aria-labelledby={`zabieg-zakładka-${index}`}
      style={{ minHeight: 490, marginTop: '8px' }}
    >
      {children}
    </Box>
  )
}

// component starts here

const TreatmentModal = ({
  clearFormTrigger,
  handleFromChange,
  setTreatmentFormData,
  setCalendarCustomerData,
  treatmentFormData,
  formsStateCopy,
  customerFormData,
  customerSearchData,
  onClose,
  open,
  allowSearchBar,
  refreshOnSave,
  isFromCalendar,
  clearGlobalProducts,
  areProductsEdited,
  ...props }) => {

  // consts from client

  let clientUID, FirstName, LastName

  if (customerSearchData && customerSearchData.UID) {
    clientUID = customerSearchData.UID;
    FirstName = customerSearchData.FirstName
    LastName = customerSearchData.LastName
  }
  else {
    clientUID = customerFormData.UID;
    FirstName = customerFormData.FirstName
    LastName = customerFormData.LastName
  }

  const classes = useStyles();

  // state stuff
  const [selectGroups, setSelectGroups] = useState({
    treatments: [],
    users: [],
    offices: []
  })
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [headingText, setHeadingText] = useState({ upper: 'Edytuj zabieg', bottom: '' })
  const [tabValue, setTabValue] = React.useState(0);
  const [historyData, setHistoryData] = React.useState(0);
  const [productsData, setProductsData] = React.useState([]);

  const ref = React.createRef()

  const handleSubmit = () => {

  }

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue)
  }

  const handleSaveButton = async () => {
    const isFormValid = await ref.current.isFormValid(false)
    if (isFormValid) {
      setSuccess(false);
      setLoading(true);
      const sendData = {
        ...treatmentFormData,
        ClientUID: treatmentFormData.ClientUID || clientUID,
        LoggedUID: treatmentFormData.UserUID,
        TreatmentDate: moment(treatmentFormData.TreatmentDate).format(),
        Products: productsData,
      }
      let result = null
      console.log(sendData)
      if (treatmentFormData.UID) result = await putData(URL.doneTreatment + '/' + treatmentFormData.UID, sendData);
      else result = await postData(URL.doneTreatment, sendData);

      if (result) {
        setSuccess(true);
        setLoading(false);
        setOpenModal(true);
        refreshOnSave();
      }
    }
  }

  function handleClose() {
    onClose();
    setCalendarCustomerData({})
    setProductsData([])
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const addAgainTreatment = () => {
    setTreatmentFormData(null)
    setSuccess(false);
    setLoading(false);
    setOpenModal(false);
  }

  const handleTreatmentChange = async (UID) => {
    const data = await getData(URL.treatments + "/" + UID);
    const newformData = {
      ...treatmentFormData,
      TreatmentUID: UID,
      Description: data.Description,
      DurationInMinutes: data.DurationInMinutes,
      Cost: data.Cost,
      Products: data.Products
    };
    setTreatmentFormData(newformData);
    setProductsData(data.Products)
  }

  const backChangesHandler = () => {
    setTreatmentFormData(formsStateCopy['treatmentForm']);
    setProductsData(formsStateCopy['treatmentProducs'])
  }

  const updateFormSelects = async () => {
    const data = await getData(URL.treatments);
    data && setSelectGroups(data)
  }

  const searchHandler = (UID) => {
    axios.get(URL.clients + '/' + UID)
      .then(res => {
        if (res.data) {
          const customerData = {
            ...res.data,
            Birthday: res.data.Birthday.slice(0, 10)
          }
          setCalendarCustomerData(customerData);
        }
      })
  }

  const clearSearchHandler = () => {
    setCalendarCustomerData(null)
  }

  React.useEffect(() => {
    if (open) {
      setTabValue(0);
      updateFormSelects();
    }
  }, [open])

  React.useEffect(() => {
    if (open) {
      let tempHeadingText = { upper: 'Edytuj zabieg' };
      if (!treatmentFormData.UID) {
        tempHeadingText.upper = 'Nowy zabieg'
      }
      let clientName = '';
      if (FirstName && LastName) clientName = FirstName + ' ' + LastName
      if (treatmentFormData.ClientName) clientName = treatmentFormData.ClientName
      if (clientName) tempHeadingText.bottom = <Box className={classes.headingText} >
        <Typography variant="caption" display="block" >Klient</Typography>
        <Typography variant="h6" display="block">{clientName}</Typography>
      </Box>;

      if (isFromCalendar && !treatmentFormData.ClientName && !customerFormData.UID) {
        if (clientName) tempHeadingText.bottom =
          <Box className={classes.headingText} >
            <Typography variant="caption" display="block" >Klient</Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" display="block">{clientName}</Typography>
              <Tooltip title='Wyszukaj ponownie'><IconButton onClick={clearSearchHandler}><Close /></IconButton></Tooltip>
            </Box>
          </Box>;
        else tempHeadingText.bottom = <div style={{ flexGrow: 1, marginRight: '8px' }}><SearchBar onSearch={searchHandler} className={classes.searchBar} isNoUser={true} /></div>;
      }
      setHeadingText(tempHeadingText)
    }
  }, [open, customerFormData, customerSearchData])
  const WasTreatmentDone = treatmentFormData.WasTreatmentDone === undefined ? false : treatmentFormData.WasTreatmentDone
  const becameTreatmentDone = treatmentFormData.IsTreatmentDone === true && WasTreatmentDone === false

  return (
    <Modal onClose={handleClose} aria-labelledby="okno-dodania-nowego-zabiegu" open={open} id="add-treatment-modal">
      <Container maxWidth='lg'>
        <Paper className={classes.modalPaper}>
          <ValidatorForm
            className={classes.form}
            ref={ref}
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}>
            <Box className={clsx(classes.fullWidth, classes.withPadding)}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
                <Tab label={<Typography variant="button">{headingText.upper}</Typography>} {...a11yProps(0)} />
                <Tab label={<Typography variant="button" component="p" style={{ display: 'flex' }}>Produkty {becameTreatmentDone ? <NotificationImportant color="secondary" /> : null}</Typography>} {...a11yProps(1)} />
                <Tab label={<Typography variant="button">Historia</Typography>}{...a11yProps(2)} disabled={true}/>
              </Tabs>
              <Divider />
              <TabPanel value={tabValue} index={0}>
                {headingText.bottom}
                <TreatmentForm handleFromChange={handleFromChange} formData={treatmentFormData} handleTreatmentChange={handleTreatmentChange} selectGroups={selectGroups} />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <TreatmentProductsTable productsData={productsData} />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <TreatmentHistory historyData={historyData} />
              </TabPanel>
            </Box>
          </ValidatorForm>
          <Divider />
          <SaveBar loading={loading}
            isDisabled={!treatmentFormData.isEdited && !areProductsEdited}
            success={success}
            handleSaveButton={handleSaveButton}
            backChangesHandler={backChangesHandler}
            handleClose={handleClose}
          />
        </Paper>
        <TreatmentActionPopup open={openModal} onClose={handleCloseModal} addNew={addAgainTreatment} />
      </Container>
    </Modal>
  )
};

const mapStateToProps = state => ({
  customerFormData: state.customerForm,
  customerSearchData: state.calendarCustomer,
  treatmentFormData: state.treatmentForm,
  formsStateCopy: state.formsStateCopy,
  areProductsEdited: state.areFormsEdited["treatmentProducs"] ? state.areFormsEdited["treatmentProducs"].includes(true) : false
});

const mapDispatchToProps = dispatch => ({
  handleFromChange: (field, value) => dispatch(updateForm('treatmentForm', field, value)),
  setTreatmentFormData: (data) => dispatch(setForm('treatmentForm', data)),
  setCalendarCustomerData: (data) => dispatch(setForm('calendarCustomer', data)),
  clearGlobalProducts: (data) => dispatch(setTable('treatmentProducs', data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TreatmentModal);
