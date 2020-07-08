import React from 'react';
import classes from './Button.module.scss';
import { isWidthDown } from '@material-ui/core';

interface ButtonProps {
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  width?: string;
  clicked(): void;
}

export const Button: React.FC<ButtonProps> = ({
  textColor,
  borderColor,
  backgroundColor,
  width,
  clicked,
  children,
}) => {
  return (
    <button
      className={classes.Button}
      style={{
        color: textColor,
        border: `1px solid ${borderColor}`,
        backgroundColor: backgroundColor,
        width: width,
      }}
      onClick={clicked}
    >
      {children}
    </button>
  );
};
