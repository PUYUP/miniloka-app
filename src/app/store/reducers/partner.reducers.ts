import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as partnerActions from '../actions/partner.actions';

export const partnerFeatureName = 'partner';

export interface PartnerState {
  result?: any; // from created
  results?: any[];
  error: any;
  status: any;
}

export const initialPartnerState: PartnerState = {
  result: {},
  results: [],
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _partnerReducer = createReducer(
  initialPartnerState,

  // CREATE
  /*
  on(partnerActions.Create, (state, payload) => {
    return {
      ...state,
      result: payload.data,
      results: [payload.data, ...state.results],
      status: Statuses.LOADING,
    };
  }),
  */
  on(partnerActions.CreateSuccess, (state, payload) => {
    return {
      ...state,
      result: payload.result,
      results: [{ ...payload.result }, ...state.results],
      status: Statuses.LOADED,
    };
  }),
  on(partnerActions.CreateFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),

  // UPDATE
  on(partnerActions.Update, (state, payload) => {
    let results = [...state.results];
    let res = results.map((d: any) => {
      if (d.uuid == payload.data?.uuid) {
        d = { ...d, ...payload.data };
      }

      return d;
    });

    return {
      ...state,
      result: payload.data,
      results: res,
    };
  }),
  on(partnerActions.UpdateSuccess, (state, payload) => {
    let results = [...state.results];
    let res = results.map((d: any) => {
      if (d.uuid == payload?.result?.uuid) {
        d = { ...d, ...payload?.result };
      }

      return d;
    });

    return {
      ...state,
      result: payload.result,
      results: res,
    };
  }),
  on(partnerActions.UpdateFailure, (state, error) => {
    return {
      ...state,
      error: error,
    };
  }),

  // DELETE
  /*
  on(partnerActions.Delete, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),
  */
  on(partnerActions.DeleteSuccess, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      result: {},
      results: x,
      status: Statuses.LOADED,
    };
  }),

  // RETRIEVE
  on(partnerActions.Retrieve, (state: PartnerState, payload) => {
    return {
      ...state,
      result: {},
      status: Statuses.LOADING,
    };
  }),
  on(partnerActions.RetrieveSuccess, (state: PartnerState, payload) => {
    return {
      ...state,
      result: payload.result,
      status: Statuses.LOADED,
    };
  }),

  // GET
  on(partnerActions.Get, (state: PartnerState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(
    partnerActions.GetSuccess,
    (state: PartnerState, { results, next, previous, isLoadMore }) => {
      return {
        ...state,
        results: [...state.results, ...results],
        next: next,
        previous: previous,
        status: Statuses.LOADED,
        isLoadMore: isLoadMore,
      };
    }
  ),

  // LOCATION
  on(partnerActions.UpdateLocationSuccess, (state: PartnerState, payload) => {
    return {
      ...state,
      result: { ...state.result, location: payload.location },
      status: Statuses.LOADED,
    };
  }),

  // SET DEFAULT
  on(partnerActions.SetDefaultSuccess, (state: PartnerState, payload) => {
    return {
      ...state,
      status: Statuses.LOADED,
    };
  })
);

export function partnerReducer(
  state: PartnerState | undefined,
  action: Action
) {
  return _partnerReducer(state, action);
}
