import React from 'react';

// TODO: Remove the component if not in use
export const TableRow = ({ row }) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.fatherName}</td>
      <td>{row.mobile}</td>
    </tr>);

const Table = ({ data, headings }) => (
  <table>
    <thead>
      <tr>
        {
          headings.map(head => (
            <th key={head}>{head}</th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {data.map(row =>
        <TableRow
          key={row.id}
          row={row}
        />
      )}
    </tbody>
  </table>
);

export default Table;
