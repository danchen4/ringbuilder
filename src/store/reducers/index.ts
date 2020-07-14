import { combineReducers } from 'redux';
import { cartReducer } from './cart';
import { ringBuilderReducer } from './ringbuilder';
import { ringProductReducer } from './ringproduct';
import { ringCatalogReducer } from './ringcatalog';
import { diamondProductReducer } from './diamondproduct';
import { diamondCatalogReducer } from './diamondcatalog';
import { AuthStateReducer } from './auth';
import { orderReducer } from './order';

export const reducers = combineReducers({
  cart: cartReducer,
  ringBuilder: ringBuilderReducer,
  ringProduct: ringProductReducer,
  ringCatalog: ringCatalogReducer,
  diamondProduct: diamondProductReducer,
  diamondCatalog: diamondCatalogReducer,
  auth: AuthStateReducer,
  order: orderReducer,
});
