import React, { Suspense } from 'react';
// Router
import { Switch, Route } from 'react-router-dom';
// CSS
import './App.scss';
// Components
import { Spinner } from './components/UI/Spinner/Spinner';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
// MUI

// Lazy load
// #region
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
  return import('./components/Review/Review');
});

const Cart = React.lazy(() => {
  return import('./components/Cart/Cart');
});

const Checkout = React.lazy(() => {
  return import('./components/Checkout/Checkout');
});

const Home = React.lazy(() => {
  return import('./components/Home/Home');
});
// #endregion

// Stripe

function App() {
  const routes = (
    <Switch>
      <Route exact path="/rings" render={() => <RingCatalog />} />
      <Route path="/rings/:sku" render={() => <RingProduct />} />
      <Route exact path="/diamonds" render={() => <DiamondCatalog />} />
      <Route path="/diamonds/:certNumber" render={() => <DiamondProduct />} />
      <Route path="/review" render={() => <Review />} />
      <Route exact path="/cart" render={() => <Cart />} />
      <Route path="/checkout" render={() => <Checkout />} />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="*" render={() => <Home />} />
    </Switch>
  );

  const loading = (
    <React.Fragment>
      <Spinner />
    </React.Fragment>
  );

  return (
    <div className="App">
      <Header />
      <div className="App__section">
        <Suspense fallback={loading}>{routes}</Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
