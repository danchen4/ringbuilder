import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

const API_KEY = 'AIzaSyD2nhb11L-i2ppteTgMgvoz_tdK28p8ZIs';

export interface AuthStartAction {
  type: ActionTypes.authStart;
}

export interface AuthFailAction {
  type: ActionTypes.authFail;
  payload: AxiosError;
}

export interface AuthSuccessAction {
  type: ActionTypes.authSuccess;
  payload: { token: string; userId: string | null };
}

export interface AuthLogoutAction {
  type: ActionTypes.authLogout;
}

export interface FetchUserSuccessActions {
  type: ActionTypes.fetchUserSuccess;
  payload: { email: string | null; passwordHash: string | null };
}

export interface FetchUserFailActions {
  type: ActionTypes.fetchUserFail;
}

export const authStart = (): AuthStartAction => {
  return {
    type: ActionTypes.authStart,
  };
};

export const authFail = (error: AxiosError): AuthFailAction => {
  return {
    type: ActionTypes.authFail,
    payload: error,
  };
};

export const authSuccess = (token: string, userId: string | null): AuthSuccessAction => {
  return {
    type: ActionTypes.authSuccess,
    payload: { token, userId },
  };
};

export const logoutAccount = (): AuthLogoutAction => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: ActionTypes.authLogout,
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(logoutAccount());
    }, expirationTime * 1000);
  };
};

export const loginAccount = (
  formikValues: any,
  formikActions: any,
  isSignUp: boolean,
  redirect?: string | undefined,
  history?: any
) => {
  return (dispatch: Dispatch<any>) => {
    const authData = {
      email: formikValues.email,
      password: formikValues.password,
      returnSecureToken: true,
    };
    dispatch(authStart());
    let url;
    if (isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
    }
    formikActions.setSubmitting(true);
    axios
      .post(url, authData)
      .then((response) => {
        console.log('action - loginAccount(): RESPONSE', response.data);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
        history.push(redirect); //set location after successful login
      })
      .catch((err) => {
        console.log(err);
        if (typeof err.response !== 'undefined') {
          if (err.response.data.error.message === 'EMAIL_EXISTS') {
            formikActions.setErrors({ email: 'Email already exists' });
            dispatch(authFail(err.response.data.error));
          }
          if (err.response.data.error.message === 'EMAIL_NOT_FOUND') {
            formikActions.setErrors({ email: 'Email not found' });
            dispatch(authFail(err.response.data.error));
          }
          if (err.response.data.error.message === 'INVALID_PASSWORD') {
            formikActions.setErrors({ password: 'Invalid password' });
            dispatch(authFail(err.response.data.error));
          }
        }
      });
  };
};

export const checkLoginState = () => {
  return (dispatch: Dispatch<any>) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logoutAccount());
      console.log('action - checkLoginState(): dispatch(logoutAccount)');
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate') as string);
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logoutAccount());
        console.log('action - checkLoginState(): Expiration - dispatch(logoutAccount)');
      }
    }
  };
};

export const fetchUserSuccess = (
  email: string | null,
  passwordHash: string | null
): FetchUserSuccessActions => {
  return {
    type: ActionTypes.fetchUserSuccess,
    payload: { email, passwordHash },
  };
};

export const fetchUserFail = (): FetchUserFailActions => {
  return {
    type: ActionTypes.fetchUserFail,
  };
};

export const fetchUser = (token: string) => {
  return (dispatch: Dispatch) => {
    dispatch(authStart());
    axios
      .post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + API_KEY, {
        idToken: token,
      })
      .then((res) => {
        console.log('action - fetchUser(): response', res);
      })
      .catch((err) => {});
  };
};
