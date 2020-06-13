import { ActionTypes } from './types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from 'redux';

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

const fetchRingStart = () => {
  return {
    type: ActionTypes.fetchRingStart,
  };
};

const fetchRingFail = (err: AxiosError) => {
  return {
    type: ActionTypes.fetchRingFail,
    payload: err,
  };
};

const fetchRingSuccess = (rings: any) => {
  return {
    type: ActionTypes.fetchRingSuccess,
    payload: rings,
  };
};

const fetchRingProduct = (sku: string) => async (dispatch: Dispatch) => {
  const queryParams = `?orderBy="sku"&equalTo="${sku}"`
  const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
  
  dispatch(fetchRingStart());

  try {
    const response = await axios.get(url + queryParams);
    dispatch(fetchRingSuccess(response.data));
  } catch (err) {
    dispatch(fetchRingFail(err));
  }
};


