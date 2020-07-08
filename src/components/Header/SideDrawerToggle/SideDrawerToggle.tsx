import React from 'react';
// CSS
import classes from './SideDrawerToggle.module.scss';
import cn from 'classnames';

interface SideDrawerToggleProps {
  toggle?: boolean;
  clicked?(): void;
}

export const SideDrawerToggle: React.FC<SideDrawerToggleProps> = ({ toggle, clicked }) => {
  return (
    <div className={classes.SideDrawerToggle} onClick={clicked}>
      <div
        className={cn(classes.SideDrawerToggle__icon, {
          [classes.SideDrawerToggle__icon_open]: toggle,
        })}
      ></div>
    </div>
  );
};
