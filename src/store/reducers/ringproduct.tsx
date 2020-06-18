import { ActionTypes, RingActions } from '../actions/types';
import { AxiosError } from 'axios';

export interface RingData {
  sku: string;
  name: string;
  description: string;
  price: number;
  center: string;
  style: string;
  accent: number;
  thickness: number;
  metals: string[];
  gallery: string[];
}

export interface RingProductState {
  ringProductData: RingData  | null;
  loading: boolean;
  error: AxiosError | null;
}

const initialState = {
  ringProductData: {
    sku: '',
    name: '',
    description: '',
    price: 0,
    center: '',
    style: '',
    accent: 0,
    thickness: 0,
    metals: [],
    gallery: [],  
  },
  loading: false,
  error: null,
};

export const ringProductReducer = (state: RingProductState = initialState, action: RingActions) => {
  switch (action.type) {
    case ActionTypes.fetchRingStart:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.fetchRingFail:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.fetchRingSuccess:
      return {
        ...state,
        ringProductData: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
