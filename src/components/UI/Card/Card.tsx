import React from 'react';
import classes from './Card.module.scss';

interface CardProps {}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className={classes.Card}>
      <div className={classes.Card__Content}>{children}</div>
    </div>
  );
};

export default Card;
