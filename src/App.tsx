import React, { Suspense } from 'react';
import './App.scss';
// import RingCatalog from './components/Ring/RingCatalog';
import Navbar from './components/UI/Navbar/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
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

function App() {
  const routes = (
    <Switch>
      <Route exact path="/rings" render={() => <RingCatalog />} />
      <Route path="/rings/:sku" render={() => <RingProduct />} />
      <Route exact path="/diamonds" render={() => <DiamondCatalog />} />
      <Route path="/diamonds/:certNumber" render={() => <DiamondProduct />} />
      <Route exact path="/review" render={() => <Review />} />
      <Route exact path="/cart" render={() => <Cart />} />
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
      <Navbar />
      <div className="App__section">
        <Suspense fallback={loading}>{routes}</Suspense>
      </div>
    </div>
  );
}

export default App;
