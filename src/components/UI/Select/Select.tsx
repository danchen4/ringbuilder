import React, { useState } from 'react';
//CSS
import classes from './Select.module.scss';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  formControl: {
    minWidth: '20rem',
  },
  select: {
    fontSize: '1.6rem',
  },
  label: {
    fontSize: '1.6rem',
    paddingRight: '1rem',
    backgroundColor: 'white',
  },
  menuItem: {
    fontSize: '2rem',
  },
});

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

export const MySelect: React.FC<SelectProps> = ({ header, values, name, selected }) => {
  const classesMUI = useStyles();
  const [value, setValue] = useState('');

  const changeHandler = (e: any) => {
    setValue(e.target.value);
    selected(e);
  };

  return (
    <FormControl className={classesMUI.formControl} variant="outlined">
      <InputLabel className={classesMUI.label}>{header}</InputLabel>
      <Select
        className={classesMUI.select}
        value={value}
        onChange={changeHandler}
        label="Ring Size"
      >
        {/* <MenuItem value="" disabled>
          {header}
        </MenuItem> */}
        {values.map((menuItem: any) => {
          return (
            <MenuItem key={menuItem.value} value={menuItem.value} className={classesMUI.select}>
              {menuItem.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>

    // <div className={classes.MySelect}>
    //   <label htmlFor={name}>{header}</label>
    //   <select name={name} onChange={selected}>
    //     {values.map((option: SelectOptions) => {
    //       return (
    //         <option key={option.value} value={option.value}>
    //           {option.label}
    //         </option>
    //       );
    //     })}
    //   </select>
    // </div>
  );
};
