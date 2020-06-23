import React from 'react'
// Stripe
import { CardElement } from '@stripe/react-stripe-js';
// CSS
import classes from './Checkout.module.scss'

interface CheckoutProps {

}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
  return (<div>
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
    </div>);
}

export default Checkout