import { ActionTypes, CartActions } from '../actions/types';
import { CartItem } from '../actions/cart';

interface IntitialState {
  cartItems: CartItem[];
}

const initialState = {
  cartItems: [],
};

export const cartReducer = (state: IntitialState = initialState, action: CartActions) => {
  switch (action.type) {
    case ActionTypes.addToCart:
      return {
        ...state,
        cart: state.cartItems.push(action.payload),
      };
    case ActionTypes.removeFromCart:
      const updatedCart = state.cartItems.filter((cartItem) => cartItem.sku !== action.payload);
      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return state;
  }
};