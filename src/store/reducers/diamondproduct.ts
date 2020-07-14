import { ActionTypes, DiamondProductActions } from '../actions/types';
import { AxiosError } from 'axios';
import { DiamondData } from '../../types';

export interface DiamondProductState {
  diamondProductData: DiamondData;
  loading: boolean;
  error: AxiosError | null;
}

const initialState = {
  diamondProductData: {
    lab: { label: 'Lab', value: '' },
    certNumber: { label: 'Certificate Number', value: '' },
    shape: { label: 'Shape', value: '' },
    carats: { label: 'Carats', value: '' },
    color: { label: 'Color', value: '' },
    clarity: { label: 'Clarity', value: '' },
    cut: { label: 'Cut', value: '' },
    symmetry: { label: 'Symmetry', value: '' },
    polish: { label: 'Polish', value: '' },
    length: { label: 'Length', value: '' },
    width: { label: 'Width', value: '' },
    depth: { label: 'Depth', value: '' },
    tablePer: { label: 'Table %', value: '' },
    depthPer: { label: 'Depth %', value: '' },
    price: { label: 'Price', value: '' },
  },
  loading: false,
  error: null,
};

export const diamondProductReducer = (
  state: DiamondProductState = initialState,
  action: DiamondProductActions
) => {
  switch (action.type) {
    case ActionTypes.fetchDiamondStart:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.fetchDiamondFail:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.fetchDiamondSuccess:
      return {
        ...state,
        diamondProductData: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
