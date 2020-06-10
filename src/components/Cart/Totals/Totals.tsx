import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './Totals.module.scss';

import { formatCurrency } from '../../../helper/formatCurrency';

interface CartProps {}

interface CartItem {
  sku: string;
  name: string;
  style: string;
  metal: string;
  price: number;
}

const sampleCart = [
  {
    sku: 'sku 1',
    image:
      'https://cdn-images.gabrielny.com/is/image/GabrielCo/Medium/Gabriel-14K-White-Gold-Oval-Diamond-Engagement-Ring~ER14982O8W4JJJ-1.jpg',
    name: 'ring name 1',
    style: 'Solitaire',
    metal: '14K White Gold',
    price: 1000,
  },
  {
    sku: 'sku 2',
    image:
      'https://cdn-images.gabrielny.com/is/image/GabrielCo/Medium/Gabriel-14K-White-Gold-Oval-Diamond-Engagement-Ring~ER14982O8W4JJJ-1.jpg',
    name: 'ring name 2',
    style: 'Solitaire',
    metal: '14K White Gold',
    price: 2000,
  },
];

const Totals: React.FC<CartProps> = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  useEffect(() => {});

  const subTotal = sampleCart.reduce((subTotal, cartItem) => {
    return subTotal + cartItem.price;
  }, 0);

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
