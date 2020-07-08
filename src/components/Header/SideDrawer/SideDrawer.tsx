import React from 'react';
// CSS
import classes from './SideDrawer.module.scss';
import cn from 'classnames';
import { NavigationItems } from '../NavigationItems/NavigationItems';
import { Backdrop } from '../../UI/BackDrop/Backdrop';

interface SideDrawerProps {
  toggle?: boolean;
  clicked?(): void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ toggle, clicked }) => {
  return (
    <React.Fragment>
      <Backdrop toggle={toggle} clicked={clicked} />
      <div
        className={cn(classes.SideDrawer, {
          [classes.SideDrawer_open]: toggle,
          [classes.SideDrawer_close]: !toggle,
        })}
      >
        <NavigationItems clicked={clicked} />
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
