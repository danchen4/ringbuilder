import { ActionTypes } from './types';
import { RingBuilderRingData, RingBuilderDiamondData } from '../reducers/ringbuilder'
import { Dispatch } from 'redux';

export interface AddRingAction {
  type: ActionTypes.addRing;
  /** sku of ring to add */
  payload: RingBuilderRingData;
}

export interface RemoveRingAction {
  type: ActionTypes.removeRing;
  /** sku of ring to remove */
  payload?: string;
}

export interface AddDiamondAction {
  type: ActionTypes.addDiamond;
  /** cert number of diamond to remove */
  payload: RingBuilderDiamondData;
}

export interface RemoveDiamondAction {
  type: ActionTypes.removeDiamond;
  /** cert number of diamond to remove */
  payload?: number;
}

export const addRing = (ringData: RingBuilderRingData): AddRingAction => {
  localStorage.setItem('ringData', JSON.stringify(ringData));
  return {
    type: ActionTypes.addRing,
    payload: ringData,
  };
};

export const removeRing = (sku: string): RemoveRingAction => {
  return {
    type: ActionTypes.removeRing,
    payload: sku,
  };
};

export const addDiamond = (diamondData: RingBuilderDiamondData): AddDiamondAction => {
  localStorage.setItem('diamondData', JSON.stringify(diamondData));
  return {
    type: ActionTypes.addDiamond,
    payload: diamondData,
  };
};

export const removeDiamond = (certNumber: number): RemoveDiamondAction => {
  return {
    type: ActionTypes.removeDiamond,
    payload: certNumber,
  };
};

export const ringBuilderCheckData = () => (dispatch: Dispatch) => {
  const ringData = localStorage.getItem('ringData');
  const diamondData = localStorage.getItem('diamondData');

  if (ringData) dispatch(addRing(JSON.parse(ringData)));
  if (diamondData) dispatch(addDiamond(JSON.parse(diamondData)));
}
