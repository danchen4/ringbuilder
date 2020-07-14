import { ActionTypes, CartActions } from '../actions/types';
import { CartItem } from '../../types';

export interface CartState {
  cartItems: CartItem[];
}

const initialState = {
  cartItems: [],
};

export const cartReducer = (state: CartState = initialState, action: CartActions) => {
  switch (action.type) {
    case ActionTypes.addToCart:
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
      };
    case ActionTypes.removeFromCart:
      const updatedCart = state.cartItems.filter(
        (cartItem) => cartItem.certNumber !== action.payload
      );
      return {
        ...state,
        cartItems: updatedCart,
      };
    case ActionTypes.loadCart:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ActionTypes.clearCart:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
