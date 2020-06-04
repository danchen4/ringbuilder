import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { CartItem } from '../actions';

export interface StoreState {
  cartItems: CartItem[];
}

export const reducers = combineReducers({
  cart: cartReducer,
});
