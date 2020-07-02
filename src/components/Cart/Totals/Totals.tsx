import React, { useEffect } from 'react';
// Redux
import { useSelector } from 'react-redux';
import { CartItem } from '../../../store/reducers/cart';
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
      <div className={classes.Totals__grid}>
        <div className={classes.Totals__column}></div>
        <div className={classes.Totals__column}>
          <span className={classes.Totals__description}> Sub Total: </span>
        </div>
        <div className={classes.Totals__column}>
          <span className={classes.Totals__price}>{formatCurrency(subTotal)}</span>
        </div>
      </div>
    </div>
  );
};

export default Totals;
