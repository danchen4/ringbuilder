import { ActionTypes } from './types';
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { ringDataToArray } from '../../helper';
import { RingData } from '../reducers/ringproduct';

interface RingDataFromDatabase {
  sku: string;
  name: string;
  description: string;
  price: number;
  center_shape: string;
  ring_style: string;
  accent_weight: number;
  band_thickness: number;
  metals: string;
  image_wg_1: string;
  image_wg_2: string;
  image_wg_3: string;
  image_yg_1: string;
  image_yg_2: string;
  image_yg_3: string;
  image_rg_1: string;
  image_rg_2: string;
  image_rg_3: string;
}

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
  const queryParams = `?orderBy="sku"&equalTo="${sku}"`
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


