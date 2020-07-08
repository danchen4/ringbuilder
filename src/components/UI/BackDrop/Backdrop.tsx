import React from 'react';
//CSS
import classes from './Backdrop.module.scss';

interface BackdropProps {
  toggle?: boolean;
  clicked?(): void;
}

export const Backdrop: React.FC<BackdropProps> = ({ toggle, clicked }) => {
  return (
    <React.Fragment>
      {toggle ? <div className={classes.Backdrop} onClick={clicked} /> : null}
    </React.Fragment>
  );
};
