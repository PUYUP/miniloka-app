import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as personActions from '../actions/person.actions';

export const personFeatureName = 'person';

export interface PersonState {
  result: any;
  error: any;
  status: any;
}

export const initialPersonState: PersonState = {
  result: null,
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _personReducer = createReducer(
  initialPersonState,

  on(personActions.GetUser, (state) => {
    return {
      ...state,
      result: {},
      error: null,
      status: Statuses.LOADING,
    };
  }),
  on(personActions.GetUserSuccess, (state, result) => {
    return {
      ...state,
      result: { ...result.user },
      error: null,
      status: Statuses.LOADED,
    };
  }),

  // LOGOUT
  on(personActions.Logout, (state, {}) => {
    return {
      ...state,
      result: null,
      status: Statuses.LOADING,
    };
  }),
  on(personActions.LogoutSuccess, (state, {}) => {
    return {
      ...state,
      result: null,
      status: Statuses.LOADED,
    };
  }),

  // PROFILE
  on(personActions.UpdateProfileSuccess, (state, payload) => {
    return {
      ...state,
      result: { ...state.result, profile: payload.profile },
      status: Statuses.LOADING,
    };
  }),

  // SECURITY
  on(personActions.UpdateSecuritySuccess, (state, payload) => {
    return {
      ...state,
      result: { ...state.result, ...payload.security },
      status: Statuses.LOADING,
    };
  })
);

export function personReducer(state: PersonState | undefined, action: Action) {
  return _personReducer(state, action);
}
