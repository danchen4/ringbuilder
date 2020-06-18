import React from 'react';
import classes from './RadioGroup.module.scss';

interface RadioGroupProps {
  //** Header for the radio button group */
  header: string;
  //** Array of strings for values*/
  values: string[];
  //** Name property of radio buttons to group by */
  name: string;
  //** radio button that was selected */
  selected: string;
  //** Handler callback to determine radio button selection */
  checked(e: any): void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ header, values, name, selected, checked }) => {
  return (
    <div>
      <h5>{header}</h5>
      <div className={classes.RadioGroup}>
        {values.map((value: string, index: number) => {
          return (
            <div className="radioButton" key={value}>
              <input
                type="radio"
                name={name}
                value={value}
                onChange={checked}
                checked={value === selected}
              />
              <label>{value}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
