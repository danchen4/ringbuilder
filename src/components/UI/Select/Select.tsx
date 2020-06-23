import React from 'react';

interface Props {}

interface SelectOptions {
  value: string;
  label: string;
}

interface SelectProps {
  /** Label for select group */
  header: string;
  /** Array of select options with form {value: string, label: string} */
  values: SelectOptions[];
  /** Name attribute of select group */
  name: string;
  /** Handler callback for value selection */
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
