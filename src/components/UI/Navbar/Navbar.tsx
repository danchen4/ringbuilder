import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
