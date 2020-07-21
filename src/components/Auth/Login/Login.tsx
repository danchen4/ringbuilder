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
import classModule from './Login.module.scss';
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
    margin: '0 auto',
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
  errorMessage: {
    color: 'salmon',
    margin: '20px 0',
    width: '90%',
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
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: '',
  password: '',
};

interface LoginProps {
  pathNext?: string;
}

export const Login: React.FC<LoginProps> = ({ pathNext }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.auth.loading);

  const submitHandler = async (values: any, actions: any) => {
    actions.setSubmitting(true);
    //nextStep is executed through onLogin action creator
    await dispatch(loginAccount(values, actions, false, pathNext, history));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div className={classes.root}>
      {/* {authRedirect} */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submitHandler(values, actions);
        }}
      >
        {({ values, errors, isSubmitting, dirty, isValid }) => (
          <Box component="div" className={classes.box}>
            <Paper className={classes.paper} elevation={2}>
              <Typography variant="h4" color="secondary">
                Log In
              </Typography>
              <Form>
                <div className={classes.spacer}>
                  <MyTextField
                    name="email"
                    label="Email"
                    required
                    customStyle={{ width: '100%' }}
                  />
                </div>
                <div className={classes.spacer}>
                  <MyPasswordTextField
                    name="password"
                    label="Password"
                    required
                    customStyle={{ width: '100%' }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                    disabled={!dirty || !isValid || loading}
                  >
                    Login
                  </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
                <div className={`${classes.spacer} ${classModule.AccountSwitch}`}>
                  <p>Don't have an account?</p>
                  <Link to="/signup" className={classModule.Link}>
                    Sign Up
                  </Link>
                </div>
                <pre className={classes.valueDisplay}>{JSON.stringify(values, null, 4)}</pre>
                <pre className={classes.valueDisplay}>{JSON.stringify(errors, null, 4)}</pre>
              </Form>
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default Login;
