import { ActionTypes } from './types';
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { ringDataToArray } from '../../helper';
import { RingData } from '../../types';

export interface FetchRingStart {
  type: ActionTypes.fetchRingStart;
}

export interface FetchRingFail {
  type: ActionTypes.fetchRingFail;
  payload: AxiosError;
}

export interface FetchRingSuccess {
  type: ActionTypes.fetchRingSuccess;
  payload: RingData;
}

export const fetchRingStart = (): FetchRingStart => {
  return {
    type: ActionTypes.fetchRingStart,
  };
};

export const fetchRingFail = (err: AxiosError): FetchRingFail => {
  return {
    type: ActionTypes.fetchRingFail,
    payload: err,
  };
};

export const fetchRingSuccess = (rings: any) => {
  return {
    type: ActionTypes.fetchRingSuccess,
    payload: rings,
  };
};

export const fetchRingProduct = (sku: string) => async (dispatch: Dispatch) => {
  const queryParams = `?orderBy="sku"&equalTo="${sku}"`;
  const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
  dispatch(fetchRingStart());

  try {
    const response = await axios.get(url + queryParams);
    const data = await response.data;

    const ringCatalog = ringDataToArray(data);
    dispatch(fetchRingSuccess(ringCatalog[0]));
  } catch (err) {
    dispatch(fetchRingFail(err));
  }
};
