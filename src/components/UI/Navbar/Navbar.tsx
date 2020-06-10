import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <div className={classes.Navbar}>
      <ul>
        <li>
          <Link to="/rings">Rings</Link>
        </li>
        <li>
          <Link to="/diamonds">Diamonds</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
