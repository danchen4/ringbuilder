import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './Cart.module.scss';

import { formatCurrency } from '../../helper/formatCurrency';
import Totals from './Totals/Totals';

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

const Cart: React.FC<CartProps> = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  console.log(cartItems);

  useEffect(() => {});

  let cartCard = <p>You're cart is empty</p>;
  if (sampleCart.length) {
    cartCard = (
      <>
        <div className={classes.card}>
          {sampleCart.map((cartitem: any) => {
            return (
              <div className={classes.grid} key={cartitem.sku}>
                <div className={classes.column}>
                  <img className={classes.cartImage} src={cartitem.image} alt="ring" />
                </div>
                <div className={classes.column}>
                  <div className={classes.cartDesc}>
                    <p>SKU: {cartitem.sku}</p>
                    <p>Name: {cartitem.name}</p>
                    <p>{cartitem.style} Ring</p>
                    <button className={classes.cartRemove}>remove</button>
                  </div>
                </div>
                <div className={classes.column}>
                  <span className={classes.price}>{formatCurrency(cartitem.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Totals />
      </>
    );
  }

  return <div className={classes.Cart}>{cartCard}</div>;
};

export default Cart;
