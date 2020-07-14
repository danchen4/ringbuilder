import { ActionTypes } from './types';
import axios, { AxiosError } from 'axios';
import { ringDataToArray } from '../../helper';
import { Dispatch } from 'redux';
import { RingData } from '../../types';

export interface FetchRingCatalogStart {
  type: ActionTypes.fetchRingCatalogStart;
}

export interface FetchRingCatalogFail {
  type: ActionTypes.fetchRingCatalogFail;
  payload: AxiosError;
}

export interface FetchRingCatalogSuccess {
  type: ActionTypes.fetchRingCatalogSuccess;
  payload: RingData[];
}

export const fetchRingCatalogStart = (): FetchRingCatalogStart => {
  return {
    type: ActionTypes.fetchRingCatalogStart,
  };
};

export const fetchRingCatalogFail = (err: AxiosError): FetchRingCatalogFail => {
  return {
    type: ActionTypes.fetchRingCatalogFail,
    payload: err,
  };
};

export const fetchRingCatalogSuccess = (rings: RingData[]): FetchRingCatalogSuccess => {
  return {
    type: ActionTypes.fetchRingCatalogSuccess,
    payload: rings,
  };
};

export const fetchRingCatalog = () => async (dispatch: Dispatch) => {
  const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
  dispatch(fetchRingCatalogStart());
  try {
    const response = await axios.get(url);
    const data = response.data;
    const ringCatalog = ringDataToArray(data);
    dispatch(fetchRingCatalogSuccess(ringCatalog));
  } catch (err) {
    dispatch(fetchRingCatalogFail(err));
  }
};
