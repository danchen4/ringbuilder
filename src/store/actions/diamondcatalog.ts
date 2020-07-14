import { ActionTypes } from './types';
import axios, { AxiosError } from 'axios';
import { diamondDataToTableArray } from '../../helper';
import { Dispatch } from 'redux';
import { DiamondTableData } from '../../types';

export interface FetchDiamondCatalogStartAction {
  type: ActionTypes.fetchDiamondCatalogStart;
}

export interface FetchDiamondCatalogFailAction {
  type: ActionTypes.fetchDiamondCatalogFail;
  payload: AxiosError;
}

export interface FetchDiamondCatalogSuccessAction {
  type: ActionTypes.fetchDiamondCatalogSuccess;
  payload: DiamondTableData[];
}

export const fetchDiamondCatalogStart = (): FetchDiamondCatalogStartAction => {
  return {
    type: ActionTypes.fetchDiamondCatalogStart,
  };
};

export const fetchDiamondCatalogFail = (err: AxiosError): FetchDiamondCatalogFailAction => {
  return {
    type: ActionTypes.fetchDiamondCatalogFail,
    payload: err,
  };
};

export const fetchDiamondCatalogSuccess = (
  diamonds: DiamondTableData[]
): FetchDiamondCatalogSuccessAction => {
  return {
    type: ActionTypes.fetchDiamondCatalogSuccess,
    payload: diamonds,
  };
};

export const fetchDiamondCatalog = () => async (dispatch: Dispatch) => {
  const url = 'https://ring-commerce.firebaseio.com/diamondCatalog.json';
  dispatch(fetchDiamondCatalogStart());
  try {
    const response = await axios.get(url);
    const catalog = response.data;
    const diamondCatalog = diamondDataToTableArray(catalog);
    dispatch(fetchDiamondCatalogSuccess(diamondCatalog));
  } catch (err) {
    dispatch(fetchDiamondCatalogFail(err));
  }
};
