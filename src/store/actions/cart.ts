import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { CartItem } from '../../types';

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
  payload: CartItem[];
}

export interface ClearCartAction {
  type: ActionTypes.clearCart;
}

export const addToCart = (cartItems: CartItem[]): AddToCartAction => {
  // Retrieve cart array from local storage
  const cart = sessionStorage.getItem('cart');
  let cartArray;
  // If cart exists in local storage, then add cart item to array, else just add cartItem
  cart ? (cartArray = JSON.parse(cart).concat(cartItems)) : (cartArray = cartItems);
  sessionStorage.setItem('cart', JSON.stringify(cartArray));
  return {
    type: ActionTypes.addToCart,
    payload: cartItems,
  };
};

export const removeFromCart = (certNumber: number): RemoveFromCartAction => {
  // Retrieve cart array from local storage
  const cart = sessionStorage.getItem('cart');
  if (cart) {
    const cartArray = JSON.parse(cart);
    const filteredCartArray = cartArray.filter(
      (cartItem: CartItem) => cartItem.certNumber !== certNumber
    );
    sessionStorage.setItem('cart', JSON.stringify(filteredCartArray));
  }
  return {
    type: ActionTypes.removeFromCart,
    payload: certNumber,
  };
};

export const loadCart = (cartItems: CartItem[]): LoadCartAction => {
  return {
    type: ActionTypes.loadCart,
    payload: cartItems,
  };
};

export const loadCartFromLocal = () => (dispatch: Dispatch) => {
  const cart = sessionStorage.getItem('cart');
  if (cart) {
    const cartArray = JSON.parse(cart);
    dispatch(loadCart(cartArray));
  }
};

export const clearCart = (): ClearCartAction => {
  sessionStorage.removeItem('cart');
  return {
    type: ActionTypes.clearCart,
  };
};
