import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, inr, usd) {
  return { id, date, inr, usd };
}


export default function Orders(props) {
  const rows = [];
  let count = 0;
  if (props.amountsInINR && props.rate && props.timestamp) {
    for (const amount of props.amountsInINR) {
      if (amount) {
        let dateTimeString = `${(new Date(props.timestamp)).toDateString()} ${(new Date(props.timestamp)).toTimeString()}`;
        rows.push(createData(count++, dateTimeString, amount, (amount * props.rate).toFixed(4)))
      }
    }
  }
  return (
    <React.Fragment>
      <Title>Converted Values</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date {rows[0] ? rows[0].date.slice(34) : ''}</TableCell>
            <TableCell>INR</TableCell>
            <TableCell>USD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date.substr(0, 25)}</TableCell>
              <TableCell>{row.inr}</TableCell>
              <TableCell>{row.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}