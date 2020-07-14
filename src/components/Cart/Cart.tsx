import React, { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { loadCartFromLocal, removeFromCart } from '../../store/actions';
import { CartItem } from '../../types';
// Router
import { useHistory } from 'react-router';
//CSS
import classes from './Cart.module.scss';
// Components
import Totals from './Totals/Totals';
import { PageContent } from '../StyledUI/PageContent';
import { MyGrid } from '../StyledUI/MyGrid';
import { Spacer } from '../StyledUI/Spacer';
import { CustomButton } from '../StyledUI/CustomButton';
import { Label } from '../StyledUI/Label';
import { Attribute } from '../StyledUI/Attribute';
import { ProductName } from '../StyledUI/ProductName';
import { ProductType } from '../StyledUI/ProductType';
import { MyImage } from '../StyledUI/MyImage';
// Misc
import { formatCurrency } from '../../helper/formatCurrency';
import { Description } from '../StyledUI/Description';

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: any) => state.auth.token !== null);

  useEffect(() => {
    const cart = sessionStorage.getItem('cart');
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

  let cartTable = <Description>You're cart is empty</Description>;
  if (cartItems.length) {
    cartTable = (
      <PageContent>
        <div className={classes.Cart__table}>
          {cartItems.map((cartItem: CartItem) => {
            return (
              <Spacer mTop={1} key={cartItem.certNumber}>
                <MyGrid columns="2fr 1fr 1fr">
                  <div className={classes.Cart__column}>
                    <MyImage width={40} alt="ring" src={cartItem.image} />
                  </div>
                  <div className={classes.Cart__column}>
                    <ProductName fontSize={1.6}>
                      {cartItem.metal} {cartItem.name}{' '}
                      {cartItem.style !== 'Solitaire' ? 'Diamond' : null} Ring
                    </ProductName>
                    <Spacer mTop={0.5} mBot={0.5}>
                      <Label fontSize={1.4}>SKU: </Label>
                      <Attribute fontSize={1.4}>{cartItem.sku}</Attribute>
                    </Spacer>
                    <Spacer mTop={0.5} mBot={0.5}>
                      <Label fontSize={1.4}>Ring Size: </Label>
                      <Attribute fontSize={1.4}>{cartItem.size}</Attribute>
                    </Spacer>
                    <ProductType fontSize={1.4}>
                      {cartItem.carats} Carats {cartItem.shape} Diamond
                    </ProductType>
                    <CustomButton text clicked={() => removeCartItemHandler(cartItem.certNumber)}>
                      remove
                    </CustomButton>
                  </div>
                  <div className={classes.Cart__column}>
                    <span className={classes.Cart__price}>{formatCurrency(cartItem.price)}</span>
                  </div>
                </MyGrid>
              </Spacer>
            );
          })}
        </div>
        <Totals subTotal={subTotal} />
        <Spacer mTop={8}>
          <CustomButton primary width="50%" clicked={checkOutHandler}>
            Check Out
          </CustomButton>
        </Spacer>
      </PageContent>
    );
  }

  return <div className={classes.Cart}>{cartTable}</div>;
};

export default Cart;
