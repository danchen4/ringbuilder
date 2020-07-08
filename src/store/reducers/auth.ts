import { ActionTypes, AuthActions } from '../actions/types';
import { AxiosError } from 'axios';

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: AxiosError | null;
  loading: boolean;
  userData: { email: string; passwordHash: string };
}

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  userData: { email: '', passwordHash: '' },
};

// const fetchUserSuccess = (state, action) => {
//   const userDataCopy = {
//     ...state.userData,
//     email: action.email,
//     passwordHash: action.passwordHash,
//   };

//   return {
//     ...state,
//     error: null,
//     loading: false,
//     userData: userDataCopy,
//   };
// };

export const AuthStateReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case ActionTypes.authStart:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ActionTypes.authFail:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ActionTypes.authSuccess:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        error: null,
        loading: false,
      };
    case ActionTypes.authLogout:
      return {
        ...state,
        token: null,
        userId: null,
        loading: false,
      };
    default:
      return state;
  }
};
