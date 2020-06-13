import { ActionTypes, RingBuilderActions } from '../actions/types';

export interface RingBuilderRingData {
  sku: string;
  image: string[];
  name: string;
  style: string;
  metal: string;
  price: number;
}

export interface RingBuilderDiamondData {
  certNumber: string;
  lab: string,
  carats: number,
  shape: string,
  clarity: string,
  color: string,
  price: number,
}

export interface RingBuilderState {
  ringData: RingBuilderRingData | null,
  diamondData: RingBuilderDiamondData | null,
}

const initialState = {
  ringData: null,
  diamondData: null,
};

export const ringBuilderReducer = (state: RingBuilderState = initialState, action: RingBuilderActions) => {
  switch (action.type) {
    case ActionTypes.addRing:
      return {
        ...state,
        ringData: action.payload,
      };
    case ActionTypes.removeRing:
      return {
        ...state,
        ringData: null,
      };
    case ActionTypes.addDiamond:
      return {
        ...state,
        diamondData: action.payload,
      };
    case ActionTypes.removeDiamond:
      return {
        ...state,
        diamondData: null,
      };
    default:
      return state;
  }
};
