import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducers } from './store/reducers';

import { BrowserRouter } from 'react-router-dom';
import { customTheme } from './theme/MUItheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/SCtheme';
import { ThemeProvider } from 'styled-components';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_KEY, ELEMENTS_OPTIONS } from './constants';

export const store: any = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const stripePromise = loadStripe(STRIPE_KEY);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <MuiThemeProvider theme={customTheme}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </MuiThemeProvider>
      </Elements>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
