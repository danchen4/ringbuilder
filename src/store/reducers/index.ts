import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { ringBuilderReducer } from './ringbuilder';
import { ringProductReducer } from './ringproduct';
import { AuthStateReducer } from './auth';

export const reducers = combineReducers({
  cart: cartReducer,
  ringBuilder: ringBuilderReducer,
  ringProduct: ringProductReducer,
  auth: AuthStateReducer,
});
