import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as securecodeActions from '../actions/securecode.actions';

export const securecodeFeatureName = 'securecode';
export const securecodeValidateFeatureName = 'securecode_validate';

// INVOKE
export interface SecureCodeState {
  result: any;
  error: any;
  status: any;
  isResend?: boolean;
}

export const initialSecureCodeState: SecureCodeState = {
  result: null,
  error: null,
  status: Statuses.UNINITIALIZED,
  isResend: false,
};

const _securecodeReducer = createReducer(
  initialSecureCodeState,

  on(securecodeActions.Invoke, (state, payload) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.LOADING,
      isResend: false,
    };
  }),
  on(securecodeActions.InvokeSuccess, (state, payload) => {
    return {
      ...state,
      result: { ...payload.result },
      error: null,
      status: Statuses.LOADED,
    };
  }),
  on(securecodeActions.InvokeFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),
  on(securecodeActions.InvokeReset, (state) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.UNINITIALIZED,
      isResend: false,
    };
  }),
  on(securecodeActions.InvokeResend, (state) => {
    return {
      ...state,
      result: { ...state.result },
      error: null,
      status: Statuses.LOADED,
      isResend: true,
    };
  }),

  // VALIDATE
  on(securecodeActions.ValidateSuccess, (state, payload) => {
    return {
      ...state,
      result: { ...payload.result },
      error: null,
      status: Statuses.LOADED,
    };
  })
);

export function securecodeReducer(
  state: SecureCodeState | undefined,
  action: Action
) {
  return _securecodeReducer(state, action);
}

// VALIDATE
export interface SecureCodeValidateState {
  result: any;
  error: any;
  status: any;
}

export const initialSecureCodeValidateState: SecureCodeValidateState = {
  result: null,
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _securecodeValidateReducer = createReducer(
  initialSecureCodeValidateState,

  on(securecodeActions.Validate, (state) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.LOADING,
    };
  }),
  on(securecodeActions.ValidateSuccess, (state, payload) => {
    return {
      ...state,
      result: { ...payload.result },
      error: null,
      status: Statuses.LOADED,
    };
  }),
  on(securecodeActions.ValidateFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  })
);

export function securecodeValidateReducer(
  state: SecureCodeValidateState | undefined,
  action: Action
) {
  return _securecodeValidateReducer(state, action);
}
