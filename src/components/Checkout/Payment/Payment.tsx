import React from 'react';
// Stripe
import { CardElement } from '@stripe/react-stripe-js';
// CSS
import classes from './Payment.module.scss';

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = ({}) => {
  return (
    <div>
      <h3>Payment</h3>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    </div>
  );
};
