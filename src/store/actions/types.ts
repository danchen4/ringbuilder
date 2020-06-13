import { AddToCartAction , RemoveFromCartAction } from './cart';
import { AddRingAction, RemoveRingAction, AddDiamondAction, RemoveDiamondAction } from './ringbuilder'

export enum ActionTypes {
  fetchRingStart,
  fetchRingSuccess,
  fetchRingFail,
  fetchRingProduct,
  addToCart,
  removeFromCart,
  addRing,
  removeRing,
  addDiamond,
  removeDiamond,
}

export type CartActions = AddToCartAction | RemoveFromCartAction;
export type RingBuilderActions = AddRingAction | RemoveRingAction | AddDiamondAction | RemoveDiamondAction