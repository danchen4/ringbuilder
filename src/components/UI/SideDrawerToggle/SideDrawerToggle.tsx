import React from 'react';
import classes from './SideDrawerToggle.module.scss';

interface SideDrawerToggleProps {}

export const SideDrawerToggle: React.FC<SideDrawerToggleProps> = ({}) => {
  return (
    <div className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
