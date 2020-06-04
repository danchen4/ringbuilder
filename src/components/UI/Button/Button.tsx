import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={classes.Button}>{children}</button>;
};

export default Button;
