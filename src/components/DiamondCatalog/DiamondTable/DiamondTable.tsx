import React, { useState } from 'react'
// Router
import { Link, useRouteMatch } from 'react-router-dom';
// CSS
import classes from './DiamondTable.module.scss'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// Misc
import { formatCurrency } from '../../../helper';


export interface DiamondTableData {
  certNumber: number,
  shape: string,
  carats: number,
  color: string,
  clarity: string,
  cut: string,
  report: string,
  price: string,
}

interface Column {
  id: 'shape' | 'carats' | 'color' | 'clarity' | 'cut' | 'report' | 'price' | 'view';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const MIN_WIDTH = 90;

const columns: Column[] = [
  { id: 'shape', label: 'Shape', minWidth: MIN_WIDTH },
  { id: 'carats', label: 'Carats', minWidth: MIN_WIDTH },
  { id: 'color', label: 'Color', minWidth: MIN_WIDTH },
  { id: 'clarity', label: 'Clarity', minWidth: MIN_WIDTH },
  { id: 'cut', label: 'Cut', minWidth: MIN_WIDTH },
  { id: 'report', label: 'Report', minWidth: MIN_WIDTH },
  { id: 'price', label: 'Price', minWidth: MIN_WIDTH, format: (value)=>formatCurrency(value)},
  { id: 'view', label: 'View', minWidth: MIN_WIDTH },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

interface DiamondTableProps {
  diamondArray: DiamondTableData[]
}

export const DiamondTable: React.FC<DiamondTableProps> = ({ diamondArray}) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { url } = useRouteMatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {diamondArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.certNumber}>
                  {columns.map((column) => {
                    const value = column.id === 'view' ? <Link to={`${url}/${row.certNumber}`}>View</Link> : row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={diamondArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DiamondTable