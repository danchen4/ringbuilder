import React from 'react';
// Router
import { useRouteMatch, NavLink, Switch, Route, Redirect } from 'react-router-dom';
// Stripe
import { CardElement } from '@stripe/react-stripe-js';
// CSS
import classes from './Checkout.module.scss';
import { Payment } from './Payment/Payment';
import { BillingShipping } from './BillingShipping/BillingShipping';
import { Review } from './Review/Review';

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
  let { path, url } = useRouteMatch();

  console.log({ path, url });

  return (
    <div className={classes.Checkout}>
      <div className={classes.Checkout__steps}>
        <div className={classes.Checkout__steps_step}>
          <NavLink to={`${url}/billing`}>Billing / Shipping</NavLink>
        </div>
        <div className={classes.Checkout__steps_step}>
          <NavLink to={`${url}/payment`}>Payment</NavLink>
        </div>
        <div className={classes.Checkout__steps_step}>
          <NavLink to={`${url}/review`}>Review</NavLink>
        </div>
      </div>

      <Switch>
        <Route exact path={path}>
          <h3>Poops</h3>
        </Route>
        <Route path={`${path}/billing`} render={() => <BillingShipping />} />
        <Route path={`${path}/payment`} render={() => <Payment />} />
        <Route path={`${path}/review`} render={() => <Review />} />
      </Switch>
    </div>
  );
};

export default Checkout;
