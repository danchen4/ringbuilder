import { AddToCartAction, RemoveFromCartAction, LoadCartAction } from './cart';
import {
  AddRingAction,
  RemoveRingAction,
  AddDiamondAction,
  RemoveDiamondAction,
} from './ringbuilder';
import { FetchRingStart, FetchRingFail, FetchRingSuccess } from './ringproduct';
import { AuthStartAction, AuthFailAction, AuthSuccessAction, AuthLogoutAction } from './auth';

export enum ActionTypes {
  fetchRingStart,
  fetchRingSuccess,
  fetchRingFail,
  fetchRingProduct,
  addToCart,
  removeFromCart,
  loadCart,
  loadCartFromLocal,
  addRing,
  removeRing,
  addDiamond,
  removeDiamond,
  authStart,
  authFail,
  authSuccess,
  authLogout,
  fetchUserSuccess,
  fetchUserFail,
}

export type CartActions = AddToCartAction | RemoveFromCartAction | LoadCartAction;
export type RingBuilderActions =
  | AddRingAction
  | RemoveRingAction
  | AddDiamondAction
  | RemoveDiamondAction;
export type RingActions = FetchRingStart | FetchRingFail | FetchRingSuccess;
export type AuthActions = AuthStartAction | AuthFailAction | AuthSuccessAction | AuthLogoutAction;
