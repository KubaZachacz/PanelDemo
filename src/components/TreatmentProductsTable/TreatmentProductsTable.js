import React from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import tablesLocalization from 'assets/tablesLocalization.js';
// import {InputFieldNumber} from 'components/CustomTable/Inputs'
import { Table, TableBody, TableCell, TableHead, TableRow, Box } from "@material-ui/core";
import { TextValidator } from 'react-material-ui-form-validator';
import { errorTexts } from 'assets/errorTexts'
//import './TreatmentProductsTable.scss';
import { setTable, updateTable } from '../../store/actions/actions';

const editCellStyle = {
  fontSize: '0.875rem',
}

const TreatmentProductsTable = React.memo(({ setGlobalTableData, updateTableData, open, productsData }) => {
  const [tableData, setTableData] = React.useState();

  React.useEffect(() => {
    setTableData([...productsData])
    setGlobalTableData([...productsData])
  }, [productsData])

  const onChagneData = (value, id) => {
    updateTableData(id, value)
  }

  const InputFieldNumber = ({ Quantity, tableData }) => {
    const [inputValue, setValue] = React.useState(0);
    React.useEffect(() => {
      setValue(Quantity)
    }, [tableData])

    return (
      <TextValidator
        value={inputValue}
        style={editCellStyle}
        type="number"
        onChange={e => {
          setValue(e.target.value)
          onChagneData(e.target.value, tableData.id)
        }
        }
        validators={['required', 'minFloat:0', 'maxFloat:9999']}
        errorMessages={[errorTexts.required, errorTexts.minFloat, errorTexts.maxFloat]}
        helperText={"\n"}
        style={{
          minWidth: '120px'
        }}
        inputProps={{
          min: "1", max: "9999", step: "1",
          key: `product-quantity-${tableData.id}`,
          id: `product-quantity-${tableData.id}`
        }}
      />
    )
  }

  const columns = [
    { title: 'Produkt', field: 'Name' },
    { title: 'Potrzebna ilość', field: 'Quantity', type: 'numeric', defaultSort: 'desc',
    customSort: (a, b) => a.Quantity - b.Quantity,
    render: (props) => <InputFieldNumber {...props} /> },
    { title: 'Jednostka', field: 'Unit' }
  ]
  return (
    <div className="TreatmentProductsTable" style={{ padding: ' 0 16px' }}>
      <MaterialTable
        columns={columns}
        title="Produkty dla zabiegu"
        data={tableData || []}
        localization={tablesLocalization}
        options={
          {
            maxBodyHeight: 420,
            // search: false,
            // showTitle: false,
            // toolbar: false,
            paging: false
          }
        }
        components={
          {
            Container: props => {
              return (
                <Box>
                  {props.children}
                </Box>
              )
            }
          }
        }
      />
    </div>
  )
});

const mapStateToProps = state => ({
  // blabla: state.blabla,
});

const mapDispatchToProps = dispatch => ({
  setGlobalTableData: (data) => dispatch(setTable('treatmentProducs', data)),
  updateTableData: (id, data) => dispatch(updateTable('treatmentProducs', id, 'Quantity', data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TreatmentProductsTable);
