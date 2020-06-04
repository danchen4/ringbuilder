import React, { useState, useEffect, useRef } from 'react';
import classes from './RadioGroup.module.scss';

interface RadioGroupProps {
  header: string;
  values: string[];
  name: string;
  checked(e: any): void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ header, values, name, checked }) => {
  return (
    <div>
      <h5>{header}</h5>
      <div className={classes.radioGroup}>
        {values.map((value: string, index: number) => {
          return (
            <div className="radioButton" key={value}>
              <input type="radio" name={name} value={value} onChange={checked} />
              <label>{value}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
