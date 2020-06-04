import React from 'react';
import classes from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={classes.centerOuter}>
      <div className={classes.centerInner}>
        <div className={classes.loader}>Loading...</div>
      </div>
    </div>
  );
};

export default Spinner;
