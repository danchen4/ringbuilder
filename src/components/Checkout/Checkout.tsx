import React, { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { addOrderData, clearCart } from '../../store/actions';
// Stripe
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeElements, StripeCardElement, StripeError, PaymentMethod } from '@stripe/stripe-js';
// Formik Yup
import { Formik, Form, FormikValues } from 'formik';
import * as Yup from 'yup';
// CSS
import classes from './Checkout.module.scss';
import cn from 'classnames';
// MaterialUI
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import { AddressForm } from './AddressForm/AddressForm';
import { MyCheckBox } from '../UI/fkmui-checkbox/fkmui-checkbox';
import { MyTextField } from '../UI/fkmui-textfield-outline/fkmui-textfield-outline';
import { MyCard } from '../StyledUI/MyCard';
import { PageContent } from '../StyledUI/PageContent';
import { MyHeader } from '../StyledUI/MyHeader';
import { Description } from '../StyledUI/Description';
import { Spacer } from '../StyledUI/Spacer';
import { Success } from './Success/Success';
import { Label } from '../StyledUI/Label';
import { Attribute } from '../StyledUI/Attribute';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { ResetButton } from './ResetButton/ResetButton';
import { Spinner } from '../UI/Spinner/Spinner';

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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
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
    color: '#c6a700',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const validationSchema = Yup.object({
  billingName: Yup.string().required(),
  billingAddress: Yup.string().required().max(30),
  billingCity: Yup.string().required(),
  billingState: Yup.string().required(),
  billingZip: Yup.number().required(),
  shippingName: Yup.string(),
  shippingAddress: Yup.string().max(30),
  shippingCity: Yup.string(),
  shippingState: Yup.string(),
  shippingZip: Yup.number(),
  paymentName: Yup.string().required(),
});

const initialValues = {
  billingName: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  shippingName: '',
  shippingAddress: '',
  shippingCity: '',
  shippingState: '',
  shippingZip: '',
  paymentName: '',
};

const BILLING_NAMES = {
  name: 'billingName',
  address: 'billingAddress',
  city: 'billingCity',
  state: 'billingState',
  zip: 'billingZip',
};

const SHIPPING_NAMES = {
  name: 'shippingName',
  address: 'shippingAddress',
  city: 'shippingCity',
  state: 'shippingState',
  zip: 'shippingZip',
};

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: 'rgba(0,0,0,0.87)',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#eeeeee',
      },
    },
    invalid: {
      iconColor: '#f44336',
      color: '#f44336',
    },
  },
  hidePostalCode: true,
};

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
  const [sameShipping, setSameShipping] = useState(true);
  const dispatch = useDispatch();
  const classesMUI = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<StripeError | null | undefined>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(undefined);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    if (error) {
      elements?.getElement('card')?.focus();
      return;
    }
    if (cardComplete) {
      setProcessing(true);
    }
    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) as StripeCardElement,
    });

    setProcessing(false);
    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(undefined);
  };

  let form = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        let valuesCopy;
        if (sameShipping) {
          valuesCopy = {
            ...values,
            shippingName: values.billingAddress,
            shippingAddress: values.billingAddress,
            shippingCity: values.billingCity,
            shippingState: values.billingState,
            shippingZip: values.billingZip,
          };
        } else {
          valuesCopy = { ...values };
        }
        dispatch(addOrderData(valuesCopy));
        dispatch(clearCart());
        handleSubmit();
      }}
    >
      {({ values, errors, dirty, isValid }) => (
        <MyCard>
          <Form>
            <div className={classesMUI.spacer}>
              <Typography variant="h4" color="primary">
                Billing Information
              </Typography>
              <AddressForm names={BILLING_NAMES} />
            </div>

            <div className={classesMUI.spacer}>
              <MyCheckBox
                name="useBillingForShipping"
                label="My shipping information is the same as my billing information"
                required
                checked={sameShipping}
                handleChange={() => setSameShipping(!sameShipping)}
                customStyle={{ width: '100%' }}
              />
            </div>

            {!sameShipping && (
              <div className={classesMUI.spacer}>
                <Typography variant="h4" color="primary">
                  Shipping Information
                </Typography>
                <AddressForm names={SHIPPING_NAMES} />
              </div>
            )}

            <Typography variant="h4" color="primary">
              Payment Information
            </Typography>
            <div className={classesMUI.spacer}>
              <MyTextField
                name="paymentName"
                label="Name On Card"
                required
                customStyle={{ width: '100%' }}
              />
            </div>

            <div className={classes.Form}>
              <div className={classes.FormGroup}>
                <div className={classes.FormRow}>
                  <CardElement
                    options={CARD_OPTIONS}
                    onChange={(e) => {
                      setError(e.error);
                      setCardComplete(e.complete);
                    }}
                  />
                </div>
              </div>
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>

            <div className={classesMUI.spacer}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={!dirty || !isValid || !cardComplete || processing}
              >
                Complete Order
                {processing && (
                  <CircularProgress size={24} thickness={4} className={classesMUI.buttonProgress} />
                )}
              </Button>
            </div>

            {/* <pre className={classesMUI.valueDisplay}>{JSON.stringify(values, null, 4)}</pre>
                <pre className={classesMUI.valueDisplay}>{JSON.stringify(errors, null, 4)}</pre> */}
          </Form>
        </MyCard>
      )}
    </Formik>
  );

  return (
    <div className={classes.Checkout}>
      {paymentMethod ? (
        <PageContent>
          <MyCard>
            <Spacer>
              <MyHeader>Payment successful!</MyHeader>
            </Spacer>
            <Spacer>
              <Description>
                This was only a test transaction using Stripe. No money was charged.
              </Description>
            </Spacer>
            <Spacer>
              <Description>
                <Label> Payment Id: </Label>
                <Attribute>{paymentMethod.id}</Attribute>
              </Description>
            </Spacer>
            <Success />
            {/* <Spacer mTop={2}>
              <ResetButton onClick={reset} />
            </Spacer> */}
          </MyCard>
        </PageContent>
      ) : (
        form
      )}
    </div>
  );
};

export default Checkout;
