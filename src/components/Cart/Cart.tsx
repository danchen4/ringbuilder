import React, { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { loadCartFromLocal, removeFromCart } from '../../store/actions';
import {CartItem} from '../../store/reducers/cart'
// Router
import { useHistory } from 'react-router';
//CSS
import classes from './Cart.module.scss';
// Components
import Totals from './Totals/Totals';
// Misc
import { formatCurrency } from '../../helper/formatCurrency';


interface CartProps {}

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
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) dispatch(loadCartFromLocal());
  }, [dispatch])

  const removeCartItemHandler = (certNumber: number) => {
    dispatch(removeFromCart(certNumber));
  }

  const checkOutHandler = () => {
    history.push({pathname:'/checkout'})
  }

  const subTotal = cartItems.reduce((subTotal: number, cartItem: CartItem) => {
    return subTotal + cartItem.price;
  }, 0);

  console.log(cartItems)

  let cartCard = <p>You're cart is empty</p>;
  if (cartItems.length) {
    cartCard = (
      <>
        <div className={classes.card}>
          {cartItems.map((cartItem: CartItem) => {
            return (
              <div key={cartItem.certNumber} className={classes.grid}>
                <div className={classes.column}>
                  <img className={classes.cartImage} src={cartItem.image} alt="ring" />
                </div>
                <div className={classes.column}>
                  <div className={classes.cartDesc}>
                    <h2>{cartItem.metal} {cartItem.name} {cartItem.style !== 'Solitaire' ? 'Diamond' : null} Ring</h2>
                    <p>{cartItem.sku}</p>
                    <p>Ring Size: {cartItem.size}</p>
                    <br/>
                    <p>{cartItem.carats} Carats {cartItem.shape} Diamond</p>
                    <button className={classes.cartRemove} onClick={() => removeCartItemHandler(cartItem.certNumber)}>remove</button>
                  </div>
                </div>
                <div className={classes.column}>
                  <span className={classes.price}>{formatCurrency(cartItem.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Totals subTotal={subTotal} />
        <button className={classes.addToCart} onClick={checkOutHandler}>
          Checkout
        </button>
      </>
    );
  }

  return <div className={classes.Cart}>{cartCard}</div>;
};

export default Cart;
