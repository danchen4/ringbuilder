import { ActionTypes, DiamondCatalogActions } from '../actions/types';
import { AxiosError } from 'axios';
import { DiamondData } from '../../types';

export interface DiamondCatalogState {
  diamondCatalogData: DiamondData[] | null;
  loading: boolean;
  error: AxiosError | null;
}

const initialState = {
  diamondCatalogData: [],
  loading: false,
  error: null,
};

export const diamondCatalogReducer = (
  state: DiamondCatalogState = initialState,
  action: DiamondCatalogActions
) => {
  switch (action.type) {
    case ActionTypes.fetchDiamondCatalogStart:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.fetchDiamondCatalogFail:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.fetchDiamondCatalogSuccess:
      return {
        ...state,
        diamondCatalogData: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
