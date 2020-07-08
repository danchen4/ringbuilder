import React from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../../store/actions';
// Router
import { Link, useHistory } from 'react-router-dom';
// Formik Yup
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// CSS
import classes from './BillingShipping.module.scss';
// Material UI
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { purple } from '@material-ui/core/colors';
// Components
import { MyTextField } from '../../UI/fkmui-textfield-outline/fkmui-textfield-outline';
import { MyPasswordTextField } from '../../UI/fkmui-textfield-password/fkmui-textfield-password';

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

const validationSchema = Yup.object({
  address1: Yup.string().required().max(30),
  address2: Yup.string().max(30),
  city: Yup.string().required(),
  state: Yup.string().required(),
  zip: Yup.number().required(),
});

const initialValues = {
  address1: '',
  city: '',
  state: '',
  zip: '',
};

interface BillingShippingProps {}

export const BillingShipping: React.FC<BillingShippingProps> = ({}) => {
  const classesMUI = useStyles();
  const history = useHistory();

  return (
    <div className={classesMUI.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(actions, values) => {}}
      >
        {({ values, errors, dirty, isValid }) => (
          <Box component="div" className={classesMUI.box}>
            <Paper className={classesMUI.paper} elevation={2}>
              <Typography variant="h4" color="secondary">
                Billing
              </Typography>
              <Form>
                <div className={classesMUI.spacer}>
                  <MyTextField
                    name="address1"
                    label="Address"
                    customStyle={{ width: '100%' }}
                    type="text"
                    required
                  />
                </div>

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  disabled={!dirty || !isValid}
                >
                  Continue
                </Button>
                {/* {loadingREDUX && (
                    <CircularProgress size={24} className={classesMUI.buttonProgress} />
                  )} */}

                <pre className={classesMUI.valueDisplay}>{JSON.stringify(values, null, 4)}</pre>
                <pre className={classesMUI.valueDisplay}>{JSON.stringify(errors, null, 4)}</pre>
              </Form>
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};
