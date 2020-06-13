import { combineReducers } from 'redux';
import { cartReducer} from './cart';
import { ringBuilderReducer } from './ringbuilder';
import { CartItem } from '../actions';

export interface StoreState {
  cartItems?: CartItem[];
  ringSku?: string,
  diamondCert?: string,
}

export const reducers = combineReducers({
  cart: cartReducer,
  ringBuilder: ringBuilderReducer,
});
