import React, { Suspense } from 'react';
// Router
import { Switch, Route, Redirect } from 'react-router-dom';
// Stripe 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// CSS
import './App.scss';
// Components
import Navbar from './components/UI/Navbar/Navbar';
import Spinner from './components/UI/Spinner/Spinner';
import Backdrop from './components/UI/BackDrop/Backdrop';

// Lazy load
const RingCatalog = React.lazy(() => {
  return import('./components/RingCatalog/RingCatalog');
});

const RingProduct = React.lazy(() => {
  return import('./components/RingProduct/RingProduct');
});

const DiamondCatalog = React.lazy(() => {
  return import('./components/DiamondCatalog/DiamondCatalog');
});

const DiamondProduct = React.lazy(() => {
  return import('./components/DiamondProduct/DiamondProduct');
});

const Review = React.lazy(() => {
  return import('./components/Review/Review')
})

const Cart = React.lazy(() => {
  return import('./components/Cart/Cart');
});

const Checkout = React.lazy(() => {
  return import('./components/Checkout/Checkout');
});

// Stripe
const stripePromise = loadStripe('pk_test_51GwwiaDWXOI2lyGirOeBNp5dd8VLcbePcvTuCxEIUWmVUXxaj39YYghL8MaWUjW2yZFGKdDKQkQcZp7PYHU1Y45P00uLIiyCGs');


function App() {
  const routes = (
    <Switch>
      <Route exact path="/rings" render={() => <RingCatalog />} />
      <Route path="/rings/:sku" render={() => <RingProduct />} />
      <Route exact path="/diamonds" render={() => <DiamondCatalog />} />
      <Route path="/diamonds/:certNumber" render={() => <DiamondProduct />} />
      <Route exact path="/review" render={() => <Review />} />
      <Route exact path="/cart" render={() => <Cart />} />
      <Route exact path="/checkout" render={() => <Checkout />} />
      {/* <Route exact path="/" component={RingCatalog} /> */}
    </Switch>
  );

  const loading = (
    <React.Fragment>
      <Backdrop />
      <Spinner />
    </React.Fragment>
  );

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
      <Navbar />
      <div className="App__section">
        <Suspense fallback={loading}>{routes}</Suspense>
        </div>
      </Elements>
    </div>
  );
}

export default App;
