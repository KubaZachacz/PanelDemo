import React, { useState } from 'react';
import { connect } from 'react-redux';
import tablesLocalization from 'assets/tablesLocalization.js';
import MaterialTable from 'material-table';
import { ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import TreatmentProductsTable from 'components/TreatmentProductsTable/TreatmentProductsTable'
import CustomModal from 'components/UI/CustomModal/CustomModal'
import { AddShoppingCart } from '@material-ui/icons';
import SaveBar from 'components/UI/SaveBar/SaveBar'
import { Divider } from '@material-ui/core';
import { setFrefreshTreatmentTable } from '../../store/actions/actions';

import './TreatmentsTable.scss';
const getTableData = (URL) => {
  return new Promise(resolve => {
    axios.get(URL)
      .then(res => {
        if (res.data) {
          resolve(res.data)
        }
      })
      .catch(function (error) {
        console.log(error);
        resolve(null)
      });
  });
}

const postTableData = (URL, data) => {
  console.log(URL)
  console.log(data)
  return new Promise(resolve => {
    axios.post(URL, data)
      .then(function (response) {
        console.log(response);
        resolve(true)
      })
      .catch(function (error) {
        console.log(error);
        resolve(false)
      });
  });
}

const putTableData = (URL, data) => {
  return new Promise(resolve => {
    const { UID, ...payload } = data;
    axios.put(URL + "/" + UID, payload)
      .then(function (response) {
        console.log(response);
        resolve(true)
      })
      .catch(function (error) {
        console.log(error);
        resolve(false)
      });
  });
}

const TreatmentsTable = ({ columns, URL, subURL, productsTableData, passRefreshFn }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});

  const ref = React.createRef()

  const updateColumnData = async () => {
    setIsLoading(true)
    const data = await getTableData(URL);
    if (data) {
      setTableData(data)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    updateColumnData();
    passRefreshFn(updateColumnData)
  }, [])

  const handleSubmit = () => {
    // your submit logic
  }

  const handleClose = () => {
    setOpen(false)
    setSuccess(false);
    setLoading(false);
  }

  const handleSaveButton = async () => {
    const isFormValid = await ref.current.isFormValid(false)
    if (isFormValid) {
      setSuccess(false);
      setLoading(true);
      const sendData = {
        TreatmentUID: rowData.UID,
        UID: rowData.UID,
        Products: [...productsTableData]
      }
      const isSucces = await putTableData(subURL, sendData);
      if (isSucces) {
        const data = [...tableData];
        data[data.indexOf(rowData)] = sendData;
        setTableData(data);
        setSuccess(true);
        setLoading(false);
        handleClose(false)
      }
    }
  }

  return (
    <ValidatorForm
      ref={ref}
      onSubmit={handleSubmit}
      onError={errors => console.log(errors)}
      style={{ width: '100%' }}>
      <MaterialTable
        title=""
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        style={{ width: '100%' }}
        editable={{
          onRowAdd: newData =>
            new Promise(async (resolve, reject) => {
              const isFormValid = await ref.current.isFormValid(false)
              if (isFormValid) {
                const isSucces = await postTableData(URL, newData);
                if (isSucces) {
                  const data = [...tableData];
                  data.push(newData);
                  // setTableData(data);
                  updateColumnData();
                  resolve();
                }
              }
              else {
                reject()
              }

            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async resolve => {
              const isFormValid = await ref.current.isFormValid(false)
              if (isFormValid) {
                const isSucces = await putTableData(URL, newData);
                if (isSucces) {
                  const data = [...tableData];
                  data[data.indexOf(oldData)] = newData;
                  // setTableData(data);
                  updateColumnData();
                  resolve();
                }
              }
            }),
        }}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={tablesLocalization}
        actions={[
          {
            icon: AddShoppingCart,
            tooltip: 'Edytuj produkty',
            onClick: (event, rowData) => {
              console.log(rowData)
              setRowData({ ...rowData })
              setOpen(true)
            }
          }
        ]}

      />
      <CustomModal open={open} onClose={handleClose}>
        <TreatmentProductsTable open={open} productsData={rowData.Products} />
        <Divider />
        <SaveBar loading={loading}
          disabled={false}
          success={success}
          handleSaveButton={handleSaveButton}
          handleClose={handleClose}
        />
      </CustomModal>
    </ValidatorForm>
  )
};

const mapStateToProps = state => ({
  productsTableData: state.treatmentProducs || []
});

const mapDispatchToProps = dispatch => ({
  passRefreshFn: (fn) => dispatch(setFrefreshTreatmentTable(fn))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TreatmentsTable);
