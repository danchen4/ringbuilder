import React, { useState, ReactElement } from 'react';
import classes from './IconCheckboxGroup.module.scss';
import { RoundDiamond } from '../SVG/RoundDiamond';
import { OvalDiamond } from '../SVG/OvalDiamond';

interface IconCheckboxGroupProps {
  //** Header for the radio button group */
  header: string;
  //** Array of strings for values*/
  values: string[];
  //** If true, will not display header*/
  mobile?: boolean;
  //** Handler callback to determine radio button selection */
  checked(e: any): void;
}

const valuesToObject = (arr: string[]) => {
  const obj: any = {};

  arr.forEach((value: string, index: number) => {
    // index === 0 ? obj[item] = true : obj[item] = false;
    obj[value] = false;
  });

  return obj;
};

const getDiamondShapes = (color?: string): { [key: string]: ReactElement } => ({
  Round: <RoundDiamond fillColor={color} />,
  Oval: <OvalDiamond fillColor={color} />,
});

export const IconCheckboxGroup: React.FC<IconCheckboxGroupProps> = ({
  header,
  values,
  mobile,
  checked,
}) => {
  const [isChecked, setIsChecked] = useState(valuesToObject(values));

  const changeHandler = (e: any) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;

    const isCheckedCopy = {
      ...isChecked,
      [name]: value,
    };

    // will re-render and make checkbox show checked or unchecked;
    setIsChecked(isCheckedCopy);
    // send object of checked values
    checked(isCheckedCopy);
  };

  return (
    <div>
      <div className={classes.IconCheckboxGroup}>
        {!mobile && <h4>{header}:</h4>}
        <div className={classes.IconCheckboxGroup__iconGroup}>
          {values.map((value: string, index: number) => {
            return (
              <div key={value} className={classes.IconCheckboxGroup__group}>
                <input
                  className={classes.IconCheckboxGroup__checkbox}
                  type="checkbox"
                  value={value}
                  name={value}
                  id={value} // Needed with label 'htmlFor' to allow label to be checkbox
                  onChange={changeHandler}
                  checked={isChecked[value]}
                />
                <label htmlFor={value}>{getDiamondShapes('#c9bc1f')[value]}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
