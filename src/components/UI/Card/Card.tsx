import React from 'react';
// Router
import { useHistory } from 'react-router-dom';
// CSS
import classes from './Card.module.scss';

interface CardProps {
  pathName?: string;
}

export const Card: React.FC<CardProps> = ({ pathName, children }) => {
  const history = useHistory();

  const clickedHandler = () => {
    history.push({ pathname: pathName });
  };

  return (
    <div className={classes.Card} onClick={clickedHandler}>
      <div className={classes.Card__content}>{children}</div>
    </div>
  );
};
