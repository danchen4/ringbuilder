import { ActionTypes } from './types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from 'redux';

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

const fetchRings = () => async (dispatch: Dispatch) => {
  const url = 'https://ring-commerce.firebaseio.com/ringCatalog.json';
  dispatch(fetchRingStart());

  try {
    const response = await axios.get(url);
    dispatch(fetchRingSuccess(response.data));
  } catch (err) {
    dispatch(fetchRingFail(err));
  }
};
