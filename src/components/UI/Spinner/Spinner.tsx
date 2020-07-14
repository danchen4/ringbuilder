import React from 'react';
import classes from './Spinner.module.scss';

export const Spinner: React.FC = () => {
  return (
    <div className={classes.centerOuter}>
      <div className={classes.centerInner}>
        <div className={classes.loader}>Loading...</div>
      </div>
    </div>
  );
};
