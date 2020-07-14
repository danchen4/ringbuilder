import React from 'react';
import PropTypes from 'prop-types';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useField } from 'formik';

import classes from './fkmui-select-states.module.scss';

const useStyles = makeStyles({
  root: {
    fontSize: '1.4rem',
  },
  formControl: {
    width: '20%',
    margin: '1.5rem 0',
  },
  select: {
    lineHeight: '1.8rem',
  },
  label: {
    fontSize: '1.4rem',
    paddingRight: '1rem',
    backgroundColor: 'white',
  },
  errorMessage: {
    color: '#f44336',
    margin: '3px 14px 0 14px',
    fontSize: '1.4rem',
    textAlign: 'left',
    fontWeight: 'normal',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

interface MySelectStatesProps {
  name: string;
  label: string;
  required: boolean;
  fontSize?: string;
  autoFocus?: boolean;
  type?: string;
}

export const MySelectStates: React.FC<MySelectStatesProps> = ({ label, required, name }) => {
  const classesMUI = useStyles();
  const [fieldprops, meta] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classesMUI.formControl} ${classes.Shake}`
            : classesMUI.formControl
        }
        variant="outlined"
        required={required}
        error={!!errorText}
      >
        <InputLabel className={classesMUI.label}>{label}</InputLabel>
        <Select
          {...fieldprops}
          label="State"
          className={classesMUI.select}
          classes={{ root: classesMUI.root }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="AL">AL</MenuItem>
          <MenuItem value="AK">AK</MenuItem>
          <MenuItem value="AR">AR</MenuItem>
          <MenuItem value="AZ">AZ</MenuItem>
          <MenuItem value="CA">CA</MenuItem>
          <MenuItem value="CO">CO</MenuItem>
          <MenuItem value="CT">CT</MenuItem>
          <MenuItem value="DC">DC</MenuItem>
          <MenuItem value="DE">DE</MenuItem>
          <MenuItem value="FL">FL</MenuItem>
          <MenuItem value="GA">GA</MenuItem>
          <MenuItem value="HI">HI</MenuItem>
          <MenuItem value="IA">IA</MenuItem>
          <MenuItem value="ID">ID</MenuItem>
          <MenuItem value="IL">IL</MenuItem>
          <MenuItem value="IN">IN</MenuItem>
          <MenuItem value="KS">KS</MenuItem>
          <MenuItem value="KY">KY</MenuItem>
          <MenuItem value="LA">LA</MenuItem>
          <MenuItem value="MA">MA</MenuItem>
          <MenuItem value="MD">MD</MenuItem>
          <MenuItem value="ME">ME</MenuItem>
          <MenuItem value="MI">MI</MenuItem>
          <MenuItem value="MN">MN</MenuItem>
          <MenuItem value="MO">MO</MenuItem>
          <MenuItem value="MS">MS</MenuItem>
          <MenuItem value="MT">MT</MenuItem>
          <MenuItem value="NC">NC</MenuItem>
          <MenuItem value="NE">NE</MenuItem>
          <MenuItem value="NH">NH</MenuItem>
          <MenuItem value="NJ">NJ</MenuItem>
          <MenuItem value="NM">NM</MenuItem>
          <MenuItem value="NV">NV</MenuItem>
          <MenuItem value="NY">NY</MenuItem>
          <MenuItem value="ND">ND</MenuItem>
          <MenuItem value="OH">OH</MenuItem>
          <MenuItem value="OK">OK</MenuItem>
          <MenuItem value="OR">OR</MenuItem>
          <MenuItem value="PA">PA</MenuItem>
          <MenuItem value="RI">RI</MenuItem>
          <MenuItem value="SC">SC</MenuItem>
          <MenuItem value="SD">SD</MenuItem>
          <MenuItem value="TN">TN</MenuItem>
          <MenuItem value="TX">TX</MenuItem>
          <MenuItem value="UT">UT</MenuItem>
          <MenuItem value="VT">VT</MenuItem>
          <MenuItem value="VA">VA</MenuItem>
          <MenuItem value="WA">WA</MenuItem>
          <MenuItem value="WI">WI</MenuItem>
          <MenuItem value="WV">WV</MenuItem>
          <MenuItem value="WY">WY</MenuItem>
        </Select>
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};
