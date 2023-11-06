import { TableCell } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const ExceptionId = ({ row }) => {
  
    return (
      <TableCell>
        <Link to={`${row.exceptionId}`}>{row.exceptionId}</Link>
      </TableCell>
    );
 
};

export default ExceptionId;
