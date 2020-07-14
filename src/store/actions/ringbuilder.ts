import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { RingBuilderRingData, RingBuilderDiamondData } from '../../types';

export interface AddRingAction {
  type: ActionTypes.addRing;
  /** sku of ring to add */
  payload: RingBuilderRingData;
}

export interface RemoveRingAction {
  type: ActionTypes.removeRing;
}

export interface AddDiamondAction {
  type: ActionTypes.addDiamond;
  /** cert number of diamond to remove */
  payload: RingBuilderDiamondData;
}

export interface RemoveDiamondAction {
  type: ActionTypes.removeDiamond;
}

export interface ClearRingBuilderAction {
  type: ActionTypes.clearRingBuilder;
}

export const addRing = (ringData: RingBuilderRingData): AddRingAction => {
  sessionStorage.setItem('ringData', JSON.stringify(ringData));
  return {
    type: ActionTypes.addRing,
    payload: ringData,
  };
};

export const removeRing = (): RemoveRingAction => {
  sessionStorage.removeItem('ringData');
  return {
    type: ActionTypes.removeRing,
  };
};

export const addDiamond = (diamondData: RingBuilderDiamondData): AddDiamondAction => {
  sessionStorage.setItem('diamondData', JSON.stringify(diamondData));
  return {
    type: ActionTypes.addDiamond,
    payload: diamondData,
  };
};

export const removeDiamond = (): RemoveDiamondAction => {
  sessionStorage.removeItem('diamondData');
  return {
    type: ActionTypes.removeDiamond,
  };
};

export const ringBuilderCheckData = () => (dispatch: Dispatch) => {
  const ringData = sessionStorage.getItem('ringData');
  const diamondData = sessionStorage.getItem('diamondData');

  if (ringData) dispatch(addRing(JSON.parse(ringData)));
  if (diamondData) dispatch(addDiamond(JSON.parse(diamondData)));
};

export const clearRingBuilder = (): ClearRingBuilderAction => {
  sessionStorage.removeItem('ringData');
  sessionStorage.removeItem('diamondData');
  return {
    type: ActionTypes.clearRingBuilder,
  };
};
