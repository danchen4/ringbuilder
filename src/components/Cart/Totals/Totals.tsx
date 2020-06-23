import React, { useEffect } from 'react';
// Redux
import { useSelector } from 'react-redux';
import {CartItem} from '../../../store/reducers/cart'
// CSS
import classes from './Totals.module.scss';


// Misc.
import { formatCurrency } from '../../../helper/formatCurrency';

interface CartProps {
  subTotal: number;
}

const Totals: React.FC<CartProps> = ({ subTotal }) => {
  return (
    <div className={classes.Totals}>
      <div className={classes.grid}>
        <div className={classes.column}></div>
        <div className={classes.column}>Sub Total: </div>
        <div className={classes.column}>
          <span className={classes.price}>{formatCurrency(subTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default Totals;
