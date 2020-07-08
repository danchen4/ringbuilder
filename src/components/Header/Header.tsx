import React, { useState } from 'react';
// Router
import { useHistory } from 'react-router';
// CSS
import classes from './Header.module.scss';
// Components
import { NavigationItems } from './NavigationItems/NavigationItems';
import { ShoppingCart } from '../Icons/ShoppingCart';
import { Account } from '../Icons/Account';
import { Logo } from '../Icons/Logo';
import { SideDrawerToggle } from './SideDrawerToggle/SideDrawerToggle';
import SideDrawer from './SideDrawer/SideDrawer';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const [showSideDrawer, setShowSiderDrawer] = useState(false);
  const history = useHistory();

  const sideDrawerToggleHandler = () => {
    setShowSiderDrawer(!showSideDrawer);
  };

  return (
    <div className={classes.Header}>
      <div className={classes.Header__top}>
        <div className={classes.Header__top_column}>
          <SideDrawerToggle toggle={showSideDrawer} clicked={sideDrawerToggleHandler} />
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
              onClick={() => history.push({ pathname: '/login' })}
            >
              <Account fillColor="#c9bc1f" width="4rem" height="4rem" />
            </div>
            <div
              className={classes.Header__icons_icon}
              onClick={() => history.push({ pathname: '/cart' })}
            >
              <ShoppingCart fillColor="#c9bc1f" width="4rem" height="4rem" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Header__bottom}>
        <NavigationItems />
      </div>
      <SideDrawer toggle={showSideDrawer} clicked={sideDrawerToggleHandler} />
    </div>
  );
};
