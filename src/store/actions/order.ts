import { ActionTypes } from './types';
import { OrderData } from '../../types';

export interface AddOrderDataAction {
  type: ActionTypes.addOrderData;
  payload: OrderData;
}

export const addOrderData = (orderData: OrderData): AddOrderDataAction => {
  return {
    type: ActionTypes.addOrderData,
    payload: orderData,
  };
};
