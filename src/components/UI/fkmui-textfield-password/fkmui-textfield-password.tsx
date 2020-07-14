import React, { useState } from 'react';
// Formik
import { useField, ErrorMessage } from 'formik';
// CSS
import classes from './fkmui-textfield-password.module.scss';
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles({
  textField: {
    width: (customStyle: CustomStyle) => customStyle.width || undefined,
  },
  label: {
    fontSize: '1.6rem',
    paddingRight: '1rem',
    backgroundColor: 'white',
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
});

interface CustomStyle {
  width?: string | null;
}

interface MyPasswordTextFieldProps {
  name: string;
  label: string;
  required: boolean;
  autoFocus?: boolean;
  type?: string;
  customStyle?: CustomStyle;
}

export const MyPasswordTextField: React.FC<MyPasswordTextFieldProps> = ({
  name,
  label,
  required,
  type = 'text',
  autoFocus = false,
  customStyle = { width: '100%' },
}) => {
  const classesMUI = useStyles(customStyle);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldprops, meta] = useField(name);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const errorText = meta.error && meta.touched && meta.error;
  return (
    <React.Fragment>
      <FormControl
        className={
          meta.error && meta.touched
            ? `${classesMUI.textField} ${classes.Shake}`
            : classesMUI.textField
        }
        variant="outlined"
      >
        <InputLabel className={classesMUI.label}>{label}</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          {...fieldprops}
          inputProps={{ style: { fontSize: '1.6rem' } }}
          required={required}
          error={!!errorText}
          label={label}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <ErrorMessage name={name}>
        {() => <div className={classesMUI.errorMessage}>{errorText}</div>}
      </ErrorMessage>
    </React.Fragment>
  );
};
