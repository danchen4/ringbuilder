import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import {CartItem} from '../reducers/cart'


export interface AddToCartAction {
  type: ActionTypes.addToCart;
  payload: CartItem[];
}

export interface RemoveFromCartAction {
  type: ActionTypes.removeFromCart;
  /** sku of item to remove */
  payload: number;
}

export interface LoadCartAction {
  type: ActionTypes.loadCart;
  /** sku of item to remove */
  payload: CartItem[];
}


export const addToCart = (cartItems: CartItem[]): AddToCartAction => {
  // Retrieve cart array from local storage
  const cart = localStorage.getItem('cart');
  let cartArray;
  // If cart exists in local storage, then add cart item to array, else just add cartItem
  cart ? cartArray = JSON.parse(cart).concat(cartItems) : cartArray = cartItems
  localStorage.setItem('cart', JSON.stringify(cartArray));
  return {
    type: ActionTypes.addToCart,
    payload: cartItems,
  };
};

export const removeFromCart = (certNumber: number): RemoveFromCartAction => {
  // Retrieve cart array from local storage
  const cart = localStorage.getItem('cart');
  if (cart) {
    const cartArray = JSON.parse(cart);
    const filteredCartArray = cartArray.filter((cartItem:CartItem) => cartItem.certNumber !== certNumber)
    localStorage.setItem('cart', JSON.stringify(filteredCartArray ));
  };
  return {
    type: ActionTypes.removeFromCart,
    payload: certNumber,
  };
};

export const loadCart = (cartItems: CartItem[])  => {
  return {
    type: ActionTypes.loadCart,
    payload: cartItems,
  };
};

export const loadCartFromLocal = () => (dispatch: Dispatch) => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    const cartArray = JSON.parse(cart);
    dispatch(loadCart(cartArray))
  }
}
