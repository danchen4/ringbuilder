import React from 'react';

import { FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useField } from 'formik';
import classes from './fkmui-checkbox.module.scss';

const useStyles = makeStyles({
  formSelect: {
    width: (customStyle: CustomStyle) => customStyle.width || undefined,
    textAlign: 'left',
    fontWeight: 'normal',
  },
  label: {
    fontSize: '1.6rem',
  },
  errorMessage: {
    color: '#f44336',
    margin: '3px 14px 0 14px',
    fontSize: '1.6rem',
    textAlign: 'left',
    fontWeight: 'normal',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  MenuInput: {
    textAlign: 'left',
  },
});

interface CustomStyle {
  width?: string | null;
}

interface MyCheckBoxProps {
  name: string;
  label: string;
  required: boolean;
  checked?: boolean;
  handleChange?(): void;
  customStyle?: CustomStyle;
}

export const MyCheckBox: React.FC<MyCheckBoxProps> = ({
  label,
  required,
  name,
  checked,
  handleChange,
  customStyle = { width: '100%' },
}) => {
  const classesMUI = useStyles(customStyle);
  const [fieldprops, meta] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classesMUI.formSelect} ${classes.Shake}`
            : classesMUI.formSelect
        }
        required={required}
        error={!!errorText}
      >
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox {...fieldprops} color="primary" onChange={handleChange} />}
            label={label}
            checked={checked}
            classes={{
              label: classesMUI.label,
            }}
          />
        </FormGroup>
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};
