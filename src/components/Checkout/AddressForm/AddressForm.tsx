import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../../store/actions';
// Formik Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// CSS
import classes from './AddressForm.module.scss';
// Material UI
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
// Components
import { MyTextField } from '../../UI/fkmui-textfield-outline/fkmui-textfield-outline';
import { MySelectStates } from '../../UI/fkmui-select-states/fkmui-select-states';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: 'auto',
    borderRadius: '6px',
    padding: theme.spacing(3),
  },
  textField: {
    width: '90%',
  },
  spacer: {
    margin: '24px 0',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    margin: '1rem',
  },
  valueDisplay: {
    marginTop: '40px',
    width: '500px',
    margin: 'auto',
    textAlign: 'left',
  },
  buttonProgress: {
    color: purple[200],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface AddressFormProps {
  names: { [key: string]: string };
}

export const AddressForm: React.FC<AddressFormProps> = ({ names }) => {
  const classesMUI = useStyles();

  return (
    <div className={classesMUI.root}>
      <Box component="div" className={classesMUI.box}>
        <MyTextField name={names.name} label="Name" required customStyle={{ width: '100%' }} />

        <MyTextField
          name={names.address}
          label="Address"
          required
          customStyle={{ width: '100%' }}
        />

        <div className={`${classesMUI.flex}`}>
          <MyTextField name={names.city} label="City" required customStyle={{ width: '50%' }} />
          <MySelectStates name={names.state} label="State" required />
          <MyTextField name={names.zip} label="Zip Code" required customStyle={{ width: '25%' }} />
        </div>
      </Box>
    </div>
  );
};
