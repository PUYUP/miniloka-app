import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as proposeActions from '../actions/propose.actions';

export const proposeFeatureName = 'propose';

export interface ProposeState {
  result?: any; // from created
  results?: any[];
  error: any;
  status: any;
}

export const initialProposeState: ProposeState = {
  result: {},
  results: [],
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _proposeReducer = createReducer(
  initialProposeState,

  // CREATE
  /*
  on(proposeActions.Create, (state, payload) => {
    return {
      ...state,
      result: payload.data,
      results: [payload.data, ...state.results],
      status: Statuses.LOADING,
    };
  }),
  */
  on(proposeActions.CreateSuccess, (state, payload) => {
    return {
      ...state,
      result: payload.result,
      results: [{ ...payload.result }, ...state.results],
      status: Statuses.LOADED,
    };
  }),

  // UPDATE
  on(proposeActions.Update, (state, payload) => {
    let results = [...state.results];
    let index = results.findIndex((d: any) => d.uuid == payload.uuid);

    // replace items
    let data = { ...payload.data };

    results[index] = { ...results[index], ...data };

    return {
      ...state,
      result: payload.data,
      results: results,
      status: Statuses.LOADING,
    };
  }),
  on(proposeActions.UpdateSuccess, (state, payload) => {
    let results = [...state.results];
    let index = results.findIndex((d: any) => d.uuid == state?.result.uuid);

    results[index] = { ...results[index], ...payload.result };

    return {
      ...state,
      result: payload.result,
      results: results,
      status: Statuses.LOADED,
    };
  }),

  // DELETE
  /*
  on(proposeActions.Delete, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),
  */
  on(proposeActions.DeleteSuccess, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),

  // RETRIEVE
  on(proposeActions.Retrieve, (state: ProposeState, payload) => {
    return {
      ...state,
      result: {},
      status: Statuses.LOADING,
    };
  }),
  on(proposeActions.RetrieveSuccess, (state: ProposeState, payload) => {
    return {
      ...state,
      result: payload.result,
      status: Statuses.LOADED,
    };
  }),

  // GET
  on(proposeActions.Get, (state: ProposeState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(proposeActions.GetOfferPropose, (state: ProposeState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(
    proposeActions.GetSuccess,
    (state: ProposeState, { results, next, previous, isLoadMore }) => {
      return {
        ...state,
        results: [...state.results, ...results],
        next: next,
        previous: previous,
        status: Statuses.LOADED,
        isLoadMore: isLoadMore,
      };
    }
  )
);

export function proposeReducer(
  state: ProposeState | undefined,
  action: Action
) {
  return _proposeReducer(state, action);
}
