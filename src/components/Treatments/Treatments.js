import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Tooltip, Typography, IconButton, Divider, Collapse } from '@material-ui/core/';
import { ExpandMore, Add } from '@material-ui/icons';
import tablesLocalization from 'assets/tablesLocalization.js';
import MaterialTable from 'material-table';
import { setForm, updateCalendar } from 'store/actions/actions'
import axios from 'axios';
import TreatmentModal from 'components/Treatments/TreatmentModal/TreatmentModal'

//import './Customer.scss';
import moment from 'moment';

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
    display: 'block',
    // alignItems: 'center',
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

const columns = {
  treatments: [
    { title: 'Zabieg', field: 'TreatmentName' },
    // { title: 'Data', field: 'TreatmentDate', type: "datetime" },
    { title: 'Data', field: 'TreatmentTableDate', type: "datetime", defaultSort: 'desc', render: rowData => moment(rowData.TreatmentDate).format('DD-MM-YYYY HH:mm') },
    { title: 'Opis', field: 'Description' },
    { title: 'Wykonujący', field: 'WhoDoneTreatment' },
    { title: 'Wykonano', field: 'IsTreatmentDone', type: 'boolean' },
  ],
}

const getTableData = (URL) => {
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

const Treatments = ({ setFormData, clientUID, customerStats, updateCustomerStats, updateCalendar }) => {
  const classes = useStyles();

  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isExpanded, setExpanded] = React.useState(true);


  const { TreatmentCount, TreatmentDoneCount, DoneTreatmentCost, TreatmentCost } = customerStats

  const updateColumnData = async () => {
    setIsLoading(true)
    const data = await getTableData(URL.doneTreatment + '/' + clientUID);
    if (data) {
      setTableData(data)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    clientUID && updateColumnData();
  }, [clientUID])


  const [open, setOpen] = React.useState(false);

  const handleClose = value => {
    setOpen(false);
  };

  const handleAddClick = e => {
    setOpen(true);
    setFormData(null);
    e.stopPropagation();
  }

  const rowClickHandler = (e, rowData) => {
    const tempFormData = {
      ...rowData,
      WasTreatmentDone: rowData.IsTreatmentDone,
      WasTreatmentCanceled: rowData.IsTreatmentCancel,
    }
    setFormData(tempFormData);
    setOpen(true);
  }

  const formSaveHandler = () => {
    updateColumnData();
    clientUID && updateCustomerStats(clientUID);
    updateCalendar();
  }

  return (

    <ExpansionPanel defaultExpanded={true} expanded={isExpanded} onChange={() => setExpanded(!isExpanded)} >
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel-zabiegi"
        id="panel-treatments"
        classes={{ content: classes.panelContent }}
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>Zabiegi</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Wykonane: {TreatmentDoneCount}/{TreatmentCount}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>Zapłacone: {DoneTreatmentCost}/{TreatmentCost}zł</Typography>
        </div>
        <div className={classes.column}>
          <Tooltip title="Dodaj nowy zabieg"><IconButton className={classes.headingButton} size='small' onClick={(e) => handleAddClick(e)}><Add /> </IconButton></Tooltip>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {clientUID ?
          <MaterialTable
            title=""
            columns={columns.treatments}
            data={tableData}
            isLoading={isLoading}
            style={{ width: '100%' }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Dodaj zabieg',
                isFreeAction: true,
                onClick: (e) => handleAddClick(e)
              }
            ]}
            onRowClick={rowClickHandler}
            options={{
              sorting: true
            }}
            localization={tablesLocalization}
          />
          : null}
        <TreatmentModal open={open} onClose={handleClose} refreshOnSave={formSaveHandler} />
      </ExpansionPanelDetails>
      <Divider />
    </ExpansionPanel>

  )
};
const mapStateToProps = state => {
  return {
    clientUID: state.customerForm.UID || null,
    customerStats: state.customerStats || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFormData: (data) => dispatch(setForm('treatmentForm', data)),
    updateCalendar: () => dispatch(updateCalendar()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Treatments);
