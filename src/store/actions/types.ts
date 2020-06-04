import { AddtoCartAction, RemoveFromCart } from './cart';

export enum ActionTypes {
  fetchRingStart,
  fetchRingSuccess,
  fetchRingFail,
  fetchRings,
  addToCart,
  removeFromCart,
}

export type CartActions = AddtoCartAction | RemoveFromCart;
