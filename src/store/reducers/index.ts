import { combineReducers } from 'redux';
import { cartReducer} from './cart';
import { ringBuilderReducer } from './ringbuilder';
import { ringProductReducer } from './ringproduct';

export const reducers = combineReducers({
  cart: cartReducer,
  ringBuilder: ringBuilderReducer,
  ringProduct: ringProductReducer,
});
