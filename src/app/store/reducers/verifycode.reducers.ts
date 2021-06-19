import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as verifycodeActions from '../actions/verifycode.actions';

export const verifycodeFeatureName = 'verifycode';
export const verifycodeValidateFeatureName = 'verifycode_validate';

// INVOKE
export interface VerifycodeState {
  result: any;
  error: any;
  status: any;
  isResend?: boolean;
}

export const initialVerifycodeState: VerifycodeState = {
  result: null,
  error: null,
  status: Statuses.UNINITIALIZED,
  isResend: false,
};

const _verifycodeReducer = createReducer(
  initialVerifycodeState,

  on(verifycodeActions.Invoke, (state, payload) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.LOADING,
      isResend: false,
    };
  }),
  on(verifycodeActions.InvokeSuccess, (state, payload) => {
    return {
      ...state,
      result: { ...payload.result },
      error: null,
      status: Statuses.LOADED,
    };
  }),
  on(verifycodeActions.InvokeFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),
  on(verifycodeActions.InvokeReset, (state) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.UNINITIALIZED,
      isResend: false,
    };
  }),
  on(verifycodeActions.InvokeResend, (state) => {
    return {
      ...state,
      result: { ...state.result },
      error: null,
      status: Statuses.LOADED,
      isResend: true,
    };
  }),

  // VALIDATE
  on(verifycodeActions.ValidateSuccess, (state, payload) => {
    return {
      ...state,
      result: { ...payload.result },
      error: null,
      status: Statuses.LOADED,
    };
  })
);

export function verifycodeReducer(
  state: VerifycodeState | undefined,
  action: Action
) {
  return _verifycodeReducer(state, action);
}

// VALIDATE
export interface VerifycodeValidateState {
  result: any;
  error: any;
  status: any;
}

export const initialVerifycodeValidateState: VerifycodeValidateState = {
  result: null,
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _verifycodeValidateReducer = createReducer(
  initialVerifycodeValidateState,

  on(verifycodeActions.Validate, (state) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.LOADING,
    };
  }),
  on(verifycodeActions.ValidateSuccess, (state, payload) => {
    return {
      ...state,
      result: { ...payload.result },
      error: null,
      status: Statuses.LOADED,
    };
  }),
  on(verifycodeActions.ValidateFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  })
);

export function verifycodeValidateReducer(
  state: VerifycodeValidateState | undefined,
  action: Action
) {
  return _verifycodeValidateReducer(state, action);
}
