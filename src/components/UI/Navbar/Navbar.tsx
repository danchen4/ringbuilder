import React from 'react';
// Router
import { Link } from 'react-router-dom';
// CSS
import classes from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__nav}>
        <div className={classes.Navbar__nav_item}>
          <Link to="/rings">Start With A Ring</Link>
        </div>
        <div className={classes.Navbar__nav_item}>
          <Link to="/diamonds">Start With A Diamond</Link>
        </div>
      </div>
    </div>
  );
};
