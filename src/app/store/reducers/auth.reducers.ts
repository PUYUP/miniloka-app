import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as authActions from '../actions/auth.actions';
import {
  PasswordRecovery,
  PasswordRecoverySuccess,
} from '../actions/auth.actions';

export const authFeatureName = 'auth';

export interface AuthState {
  result: any;
  error: any;
  status: any;
}

export const initialAuthState: AuthState = {
  result: null,
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _authReducer = createReducer(
  initialAuthState,

  // LOGIN
  on(authActions.Login, (state) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.LOADING,
    };
  }),
  on(authActions.LoginSuccess, (state, result) => {
    return {
      ...state,
      result: { ...result },
      error: null,
      status: Statuses.LOADED,
    };
  }),
  on(authActions.LoginFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),

  // REGISTER
  on(authActions.Register, (state, credential) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.LOADING,
    };
  }),
  on(authActions.RegisterSuccess, (state, result) => {
    return {
      ...state,
      result: { ...result },
      error: null,
      status: Statuses.LOADED,
    };
  }),
  on(authActions.RegisterFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}

// PASSWORD RECOVERY
export const passwordReoveryFeatureName = 'password_recovery';

export interface PasswordRecoveryState {
  credential: any;
  error: any;
  status: any;
}

export const initialPasswordRecoveryState: PasswordRecoveryState = {
  credential: {},
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _passwordRecoveryReducer = createReducer(
  initialPasswordRecoveryState,

  on(PasswordRecovery, (state, payload) => {
    return {
      ...state,
      credential: payload.credential,
      status: Statuses.LOADING,
      error: null,
    };
  }),
  on(PasswordRecoverySuccess, (state, payload) => {
    return {
      ...state,
      credential: {},
      status: Statuses.LOADED,
      error: null,
    };
  })
);

export function passwordRecoveryReducer(
  state: PasswordRecoveryState | undefined,
  action: Action
) {
  return _passwordRecoveryReducer(state, action);
}
