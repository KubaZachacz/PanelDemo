import React from 'react';
import { connect } from 'react-redux';
import tablesLocalization from 'assets/tablesLocalization.js';
import MaterialTable from 'material-table';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { AddShoppingCart } from '@material-ui/icons';
import axios from 'axios';

import './CustomTable.scss';
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

const CustomTable = ({ columns, URL, actions, extraSaveFunction }) => {
  const [tableData, setTableData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
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
  }, [])

  const handleSubmit = () => {
    // your submit logic
  }

  let additionalPorps = {}

  // if (actions) console.log(actions)
  if (actions) additionalPorps = {
    actions: actions
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
                  setTableData(data);
                  !!extraSaveFunction && extraSaveFunction();
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
                  setTableData(data);
                  !!extraSaveFunction && extraSaveFunction();
                  resolve();
                }
              }
            }),
        }}
        {...additionalPorps}
        options={{
          actionsColumnIndex: -1,
        }}
        localization={tablesLocalization}
      />
    </ValidatorForm>
  )
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomTable);
