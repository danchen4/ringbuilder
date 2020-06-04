import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classes from './Cart.module.scss';
import Card from '../UI/Card/Card';

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
      <div className={classes.cartCard}>
        {sampleCart.map((cartitem: any) => {
          return (
            <div className={classes.cartRow} key={cartitem.sku}>
              <img className={classes.cartImage} src={cartitem.image} alt="ring" />
              <div className={classes.cartDesc}>
                <p>{cartitem.sku}</p>
                <p>{cartitem.name}</p>
              </div>
              <div className={classes.cartPrice}>
                <p>{cartitem.price}</p>
              </div>
              <button className={classes.cartRemove}>X</button>
            </div>
          );
        })}
      </div>
    );
  }

  return <div className={classes.Cart}>{cartCard}</div>;
};

export default Cart;
