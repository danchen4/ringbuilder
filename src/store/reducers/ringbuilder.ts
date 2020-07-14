import { ActionTypes, RingBuilderActions } from '../actions/types';

import { RingBuilderDiamondData, RingBuilderRingData } from './../../types';

export interface RingBuilderState {
  ringData: RingBuilderRingData | null;
  diamondData: RingBuilderDiamondData | null;
}

const initialState = {
  ringData: null,
  diamondData: null,
};

export const ringBuilderReducer = (
  state: RingBuilderState = initialState,
  action: RingBuilderActions
) => {
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
    case ActionTypes.clearRingBuilder:
      return {
        ...state,
        ringData: null,
        diamondData: null,
      };
    default:
      return state;
  }
};
