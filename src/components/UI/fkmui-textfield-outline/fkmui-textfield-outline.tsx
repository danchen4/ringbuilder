import React from 'react';
// Formik
import { useField } from 'formik';
// CSS
import classes from './fkmui-textfield-outline.module.scss';
// Material UI
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textField: {
    width: (customStyle: any) => customStyle.width || undefined,
    margin: '1.5rem 0',
  },
});

interface CustomStyle {
  width?: string | null;
  fontSize?: string | null;
}

interface MyTextFieldProps {
  name: string;
  label: string;
  required: boolean;
  fontSize?: string;
  autoFocus?: boolean;
  type?: string;
  customStyle?: CustomStyle;
}

export const MyTextField: React.FC<MyTextFieldProps> = ({
  name,
  label,
  required,
  fontSize = '1.4rem',
  type = 'text',
  autoFocus = false,
  customStyle = { width: '100%' },
}) => {
  const classesMUI = useStyles(customStyle);

  const [fieldprops, meta] = useField(name);
  const errorText = meta.error && meta.touched && meta.error;

  return (
    <TextField
      {...fieldprops}
      className={
        meta.error && meta.touched
          ? `${classesMUI.textField} ${classes.Shake}`
          : classesMUI.textField
      }
      InputProps={{ style: { fontSize: fontSize } }}
      InputLabelProps={{ style: { fontSize: fontSize } }}
      FormHelperTextProps={{ style: { fontSize: fontSize } }}
      type={type}
      required={required}
      helperText={errorText}
      error={!!errorText}
      variant="outlined"
      label={label}
      autoFocus={autoFocus}
    />
  );
};
