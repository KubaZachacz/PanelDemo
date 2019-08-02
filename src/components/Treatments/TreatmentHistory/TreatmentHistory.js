import React from 'react';
import MaterialTable from 'material-table';
import tablesLocalization from 'assets/tablesLocalization.js';
import { Table, TableBody, TableCell, TableHead, TableRow, Box } from "@material-ui/core";
//import './TreatmentHistory.scss';
import moment from 'moment'

const columns = [
  { title: 'Data modyfikacji', field: 'ModifyDate', type: 'datetime', render: rowData => moment(rowData.ModifyDate).format('DD-MM-YYYY HH:mm') },
  // TODO: zmienić na tego kto zapisał 
  { title: 'Kto zapisał', field: 'WhoDoneTreatment' },

]

const TreatmentHistory = ({ historyData }) => {
  return (
    <div className="TreatmentHistory" style={{ padding: ' 0 16px' }}>
      <MaterialTable
        columns={columns}
        data={historyData || []}
        localization={tablesLocalization}
        detailPanel={rowData => {
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Zabieg</TableCell>
                  <TableCell>Opis</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Czas trwania</TableCell>
                  <TableCell>Pracownik</TableCell>
                  <TableCell>Gabinet ID</TableCell>
                  <TableCell>Cena</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{rowData.TreatmentName}</TableCell>
                  <TableCell>{rowData.Description}</TableCell>
                  <TableCell>{moment(rowData.TreatmentDate).format('DD-MM-YYYY HH:mm')}</TableCell>
                  <TableCell>{rowData.DurationInMinutes}</TableCell>
                  <TableCell>{rowData.WhoDoneTreatment}</TableCell>
                  <TableCell>{rowData.OfficeID}</TableCell>
                  <TableCell>{rowData.Cost}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )
        }}
        options={
          {
            maxBodyHeight: 480,
            search: false,
            showTitle: false,
            toolbar: false,
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
};

export default TreatmentHistory;
