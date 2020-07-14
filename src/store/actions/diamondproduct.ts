import { ActionTypes } from './types';
import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { diamondDataToProductObj } from '../../helper';
import { DiamondData } from '../../types';

export interface FetchDiamondStartAction {
  type: ActionTypes.fetchDiamondStart;
}

export interface FetchDiamondFailAction {
  type: ActionTypes.fetchDiamondFail;
  payload: AxiosError;
}

export interface FetchDiamondSuccessAction {
  type: ActionTypes.fetchDiamondSuccess;
  payload: DiamondData;
}

export const fetchDiamondStart = (): FetchDiamondStartAction => {
  return {
    type: ActionTypes.fetchDiamondStart,
  };
};

export const fetchDiamondFail = (err: AxiosError): FetchDiamondFailAction => {
  return {
    type: ActionTypes.fetchDiamondFail,
    payload: err,
  };
};

export const fetchDiamondSuccess = (diamonds: DiamondData): FetchDiamondSuccessAction => {
  return {
    type: ActionTypes.fetchDiamondSuccess,
    payload: diamonds,
  };
};

export const fetchDiamondProduct = (certNumber: string) => async (dispatch: Dispatch) => {
  const queryParams = `?orderBy="$key"&equalTo="${certNumber}"`;
  const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
  dispatch(fetchDiamondStart());

  try {
    const response = await axios.get(url + queryParams);
    const data = await response.data;

    const diamondCatalog = diamondDataToProductObj(data);
    dispatch(fetchDiamondSuccess(diamondCatalog));
  } catch (err) {
    dispatch(fetchDiamondFail(err));
  }
};
