import { ActionTypes, RingCatalogActions } from '../actions/types';
import { AxiosError } from 'axios';
import { RingData } from '../../types';

export interface RingCatalogState {
  ringCatalogData: RingData[] | null;
  loading: boolean;
  error: AxiosError | null;
}

const initialState = {
  ringCatalogData: [],
  loading: false,
  error: null,
};

export const ringCatalogReducer = (
  state: RingCatalogState = initialState,
  action: RingCatalogActions
) => {
  switch (action.type) {
    case ActionTypes.fetchRingCatalogStart:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.fetchRingCatalogFail:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.fetchRingCatalogSuccess:
      return {
        ...state,
        ringCatalogData: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
