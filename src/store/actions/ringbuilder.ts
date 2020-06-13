import { ActionTypes } from './types';
import { RingBuilderRingData, RingBuilderDiamondData } from '../reducers/ringbuilder'


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
