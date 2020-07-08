import React, { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { loadCartFromLocal, removeFromCart, checkLoginState } from '../../store/actions';
import { CartItem } from '../../store/reducers/cart';
// Router
import { useHistory } from 'react-router';
//CSS
import classes from './Cart.module.scss';
// Components
import Totals from './Totals/Totals';
// Misc
import { formatCurrency } from '../../helper/formatCurrency';
import { Button } from '../UI/Button/Button';

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

  const isAuthenticated = useSelector((state: any) => state.auth.token !== null);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) dispatch(loadCartFromLocal());
  }, [dispatch]);

  const removeCartItemHandler = (certNumber: number) => {
    dispatch(removeFromCart(certNumber));
  };

  const checkOutHandler = () => {
    if (isAuthenticated) {
      history.push({ pathname: '/signup' });
    } else {
      history.push({ pathname: '/checkout' });
    }
  };

  const subTotal = cartItems.reduce((subTotal: number, cartItem: CartItem) => {
    return subTotal + cartItem.price;
  }, 0);

  console.log(cartItems);

  let cartTable = <p>You're cart is empty</p>;
  if (cartItems.length) {
    cartTable = (
      <>
        <div className={classes.Cart__table}>
          {cartItems.map((cartItem: CartItem) => {
            return (
              <div key={cartItem.certNumber} className={classes.Cart__grid}>
                <div className={classes.Cart__column}>
                  <img className={classes.Cart__productImage} src={cartItem.image} alt="ring" />
                </div>
                <div className={classes.Cart__column}>
                  <div className={classes.Cart__description}>
                    <h2>
                      {cartItem.metal} {cartItem.name}{' '}
                      {cartItem.style !== 'Solitaire' ? 'Diamond' : null} Ring
                    </h2>
                    <p>SKU: {cartItem.sku}</p>
                    <p>Ring Size: {cartItem.size}</p>
                    <p>
                      {cartItem.carats} Carats {cartItem.shape} Diamond
                    </p>
                    <button
                      className={classes.Cart__btn_remove}
                      onClick={() => removeCartItemHandler(cartItem.certNumber)}
                    >
                      remove
                    </button>
                  </div>
                </div>
                <div className={classes.Cart__column}>
                  <span className={classes.Cart__price}>{formatCurrency(cartItem.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Totals subTotal={subTotal} />
        <Button clicked={checkOutHandler}>Checkout</Button>
        {/* <button className={classes.Cart__btn_shop} onClick={checkOutHandler}>
          Checkout
        </button> */}
      </>
    );
  }

  return <div className={classes.Cart}>{cartTable}</div>;
};

export default Cart;
