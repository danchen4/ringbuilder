import { ActionTypes } from './types';

export interface CartItem {
  sku: string;
  image: string;
  name: string;
  style: string;
  metal: string;
  price: number;
}

export interface AddtoCartAction {
  type: ActionTypes.addToCart;
  payload: CartItem;
}

export interface RemoveFromCart {
  type: ActionTypes.removeFromCart;
  /** sku of item to remove */
  payload: string;
}

export const addToCart = (cartItem: CartItem): AddtoCartAction => {
  return {
    type: ActionTypes.addToCart,
    payload: cartItem,
  };
};

export const removeFromCart = (sku: string): RemoveFromCart => {
  return {
    type: ActionTypes.removeFromCart,
    payload: sku,
  };
};
