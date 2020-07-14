import { ActionTypes, OrderActions } from '../actions/types';
import { OrderData } from '../../types';

export interface OrderState {
  orderData: OrderData;
}

const initialState = {
  orderData: {
    billingName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    paymentName: '',
  },
};

export const orderReducer = (state: OrderState = initialState, action: OrderActions) => {
  switch (action.type) {
    case ActionTypes.addOrderData:
      return {
        ...state,
        orderData: action.payload,
      };
    default:
      return state;
  }
};
