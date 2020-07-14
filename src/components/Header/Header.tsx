import React, { useEffect, useState } from 'react';
// Router
import { useHistory } from 'react-router';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { loadCartFromLocal } from '../../store/actions';
// CSS
import classes from './Header.module.scss';
// Components
import { NavigationItems } from './NavigationItems/NavigationItems';
import { ShoppingCart } from '../Icons/ShoppingCart';
import { Logo } from '../Icons/Logo';
import { SideDrawerToggle } from './SideDrawerToggle/SideDrawerToggle';
import { SideDrawer } from './SideDrawer/SideDrawer';
import { Notification } from '../StyledUI/Notification';

export const Header: React.FC = () => {
  const [showSideDrawer, setShowSiderDrawer] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  useEffect(() => {
    const cart = sessionStorage.getItem('cart');
    if (cart) dispatch(loadCartFromLocal());
  }, [dispatch]);

  return (
    <div className={classes.Header}>
      <div className={classes.Header__top}>
        <div className={classes.Header__top_column}>
          <SideDrawerToggle
            toggle={showSideDrawer}
            clicked={() => setShowSiderDrawer(!showSideDrawer)}
          />
        </div>
        <div className={classes.Header__top_column}>
          <div className={classes.Header__logo}>
            <div
              className={classes.Header__logo_icon}
              onClick={() => history.push({ pathname: '/' })}
            >
              <Logo fillColor={'#bbb'} width="4rem" height="4rem" />
            </div>
            <h1
              className={classes.Header__logo_name}
              onClick={() => history.push({ pathname: '/' })}
            >
              Ring Builder
            </h1>
          </div>
        </div>
        <div className={classes.Header__top_column}>
          <div className={classes.Header__icons}>
            <div
              className={classes.Header__icons_icon}
              onClick={() => history.push({ pathname: '/cart' })}
            >
              <ShoppingCart fillColor="#c9bc1f" width="4rem" height="4rem" />
            </div>
            {cartItems.length !== 0 && <Notification cartItems={cartItems.length} />}
          </div>
        </div>
      </div>
      <div className={classes.Header__bottom}>
        <NavigationItems />
      </div>
      <SideDrawer toggle={showSideDrawer} clicked={() => setShowSiderDrawer(!showSideDrawer)} />
    </div>
  );
};
