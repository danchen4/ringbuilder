import { ActionTypes } from './types';

export interface CartItem {
  sku: string;
  image: string;
  name: string;
  style: string;
  metal: string;
  price: number;
}

export interface AddToCartAction {
  type: ActionTypes.addToCart;
  payload: CartItem;
}

export interface RemoveFromCartAction {
  type: ActionTypes.removeFromCart;
  /** sku of item to remove */
  payload: string;
}

export const addToCart = (cartItem: CartItem): AddToCartAction => {
  return {
    type: ActionTypes.addToCart,
    payload: cartItem,
  };
};

export const removeFromCart = (sku: string): RemoveFromCartAction => {
  return {
    type: ActionTypes.removeFromCart,
    payload: sku,
  };
};
