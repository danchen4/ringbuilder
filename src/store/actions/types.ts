import { AddToCartAction, RemoveFromCartAction, LoadCartAction, ClearCartAction } from './cart';
import {
  AddRingAction,
  RemoveRingAction,
  AddDiamondAction,
  RemoveDiamondAction,
  ClearRingBuilderAction,
} from './ringbuilder';
import { FetchRingStart, FetchRingFail, FetchRingSuccess } from './ringproduct';
import {
  FetchRingCatalogStart,
  FetchRingCatalogFail,
  FetchRingCatalogSuccess,
} from './ringcatalog';
import {
  FetchDiamondStartAction,
  FetchDiamondFailAction,
  FetchDiamondSuccessAction,
} from './diamondproduct';
import {
  FetchDiamondCatalogStartAction,
  FetchDiamondCatalogFailAction,
  FetchDiamondCatalogSuccessAction,
} from './diamondcatalog';
import { AuthStartAction, AuthFailAction, AuthSuccessAction, AuthLogoutAction } from './auth';
import { AddOrderDataAction } from './order';

export enum ActionTypes {
  fetchRingStart,
  fetchRingFail,
  fetchRingSuccess,
  fetchRingProduct,
  fetchRingCatalogStart,
  fetchRingCatalogSuccess,
  fetchRingCatalogFail,
  fetchRingCatalog,
  fetchDiamondStart,
  fetchDiamondFail,
  fetchDiamondSuccess,
  fetchDiamondCatalogStart,
  fetchDiamondCatalogSuccess,
  fetchDiamondCatalogFail,
  addToCart,
  removeFromCart,
  loadCart,
  clearCart,
  loadCartFromLocal,
  addRing,
  removeRing,
  addDiamond,
  removeDiamond,
  clearRingBuilder,
  authStart,
  authFail,
  authSuccess,
  authLogout,
  fetchUserSuccess,
  fetchUserFail,
  addOrderData,
}

export type CartActions = AddToCartAction | RemoveFromCartAction | LoadCartAction | ClearCartAction;
export type RingBuilderActions =
  | AddRingAction
  | RemoveRingAction
  | AddDiamondAction
  | RemoveDiamondAction
  | ClearRingBuilderAction;
export type RingActions = FetchRingStart | FetchRingFail | FetchRingSuccess;
export type RingCatalogActions =
  | FetchRingCatalogStart
  | FetchRingCatalogFail
  | FetchRingCatalogSuccess;
export type DiamondProductActions =
  | FetchDiamondStartAction
  | FetchDiamondFailAction
  | FetchDiamondSuccessAction;
export type DiamondCatalogActions =
  | FetchDiamondCatalogStartAction
  | FetchDiamondCatalogFailAction
  | FetchDiamondCatalogSuccessAction;
export type AuthActions = AuthStartAction | AuthFailAction | AuthSuccessAction | AuthLogoutAction;
export type OrderActions = AddOrderDataAction;
