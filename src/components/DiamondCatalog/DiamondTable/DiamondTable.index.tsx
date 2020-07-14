import React, { useState } from 'react';
// Router
import { Link, useRouteMatch } from 'react-router-dom';
// CSS
import classes from './DiamondTable.module.scss';
import cn from 'classnames';
// Material UI
import { Theme, makeStyles } from '@material-ui/core/styles';
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
import { ToggleSort } from '../../UI/ToggleSort/ToggleSort';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 1000,
  },
  head: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
  row: {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
  paginate: {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
}));

export interface DiamondTableData {
  certNumber: number;
  shape: string;
  carats: number;
  color: string;
  clarity: string;
  cut: string;
  report: string;
  price: string;
}

interface Column {
  id: 'shape' | 'carats' | 'color' | 'clarity' | 'cut' | 'report' | 'price' | 'view';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const MIN_WIDTH = 60;

const columns: Column[] = [
  { id: 'shape', label: 'Shape', minWidth: MIN_WIDTH },
  { id: 'carats', label: 'Carats', minWidth: MIN_WIDTH },
  { id: 'color', label: 'Color', minWidth: MIN_WIDTH },
  { id: 'clarity', label: 'Clarity', minWidth: MIN_WIDTH },
  { id: 'cut', label: 'Cut', minWidth: MIN_WIDTH },
  { id: 'report', label: 'Report', minWidth: MIN_WIDTH },
  { id: 'price', label: 'Price', minWidth: MIN_WIDTH, format: (value) => formatCurrency(value) },
  { id: 'view', label: 'View', minWidth: MIN_WIDTH },
];

interface DiamondTableProps {
  diamondArray: DiamondTableData[];
  /** Handler callback for sorting table*/
  sortTable(e: any, sortDesc: boolean): void;
}

export const DiamondTable: React.FC<DiamondTableProps> = ({ diamondArray, sortTable }) => {
  const style = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { url } = useRouteMatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortHandler = (e: any, desc: boolean) => {
    sortTable(e, desc);
  };

  return (
    <Paper className={style.root}>
      <TableContainer className={style.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={style.head}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {['Carats', 'Price'].includes(column.label) ? (
                    <ToggleSort label={column.label} clicked={sortHandler} />
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {diamondArray
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.certNumber}>
                    {columns.map((column) => {
                      const value =
                        column.id === 'view' ? (
                          <Link
                            className={classes.DiamondTable__link}
                            to={`${url}/${row.certNumber}`}
                          >
                            View
                          </Link>
                        ) : (
                          row[column.id]
                        );
                      return (
                        <TableCell key={column.id} className={style.row} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
        className={style.paginate}
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
};
