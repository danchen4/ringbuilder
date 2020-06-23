import { ActionTypes, CartActions } from '../actions/types';

export interface CartItem {
  sku: string;
  image: string;
  name: string;
  style: string;
  metal: string;
  size: string,
  price: number;
  certNumber: number,
  carats: number,
  shape: string,
}

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
      const updatedCart = state.cartItems.filter((cartItem) => cartItem.certNumber !== action.payload);
      return {
        ...state,
        cartItems: updatedCart,
      };
    case ActionTypes.loadCart:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
