import React from 'react';
// Router
import { Link } from 'react-router-dom';
// CSS
import classes from './NavigationItems.module.scss';

interface NavigationItemsProps {
  clicked?(): void;
}

export const NavigationItems: React.FC<NavigationItemsProps> = ({ clicked }) => {
  return (
    <div className={classes.NavigationItems}>
      <div className={classes.NavigationItems__nav}>
        <div className={classes.NavigationItems__nav_item} onClick={clicked}>
          <Link to="/rings">Start With A Ring</Link>
        </div>
        <div className={classes.NavigationItems__nav_item} onClick={clicked}>
          <Link to="/diamonds">Start With A Diamond</Link>
        </div>
      </div>
    </div>
  );
};
