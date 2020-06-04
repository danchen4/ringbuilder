import React from 'react';

interface Props {}

interface SelectOptions {
  value: string;
  label: string;
}

interface SelectProps {
  header: string;
  values: SelectOptions[];
  name: string;
  selected(e: any): void;
}

const Select: React.FC<SelectProps> = ({ header, values, name, selected }) => {
  return (
    <div>
      <label htmlFor={name}>{header}</label>
      <select name={name} onChange={selected}>
        {values.map((option: SelectOptions) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
