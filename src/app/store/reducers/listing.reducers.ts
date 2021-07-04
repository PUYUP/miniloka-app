import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as listingActions from '../actions/listing.actions';

export const listingFeatureName = 'listing';

export interface ListingState {
  result?: any; // from created
  results?: any[];
  error: any;
  status: any;
}

export const initialListingState: ListingState = {
  result: {},
  results: [],
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _listingReducer = createReducer(
  initialListingState,

  // CREATE
  /*
  on(listingActions.Create, (state, payload) => {
    return {
      ...state,
      result: payload.data,
      results: [payload.data, ...state.results],
      status: Statuses.LOADING,
    };
  }),
  */
  on(listingActions.CreateSuccess, (state, payload) => {
    return {
      ...state,
      result: payload.result,
      results: [{ ...payload.result }, ...state.results],
      status: Statuses.LOADED,
    };
  }),
  on(listingActions.CreateFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),

  // UPDATE
  on(listingActions.Update, (state, payload) => {
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
  on(listingActions.UpdateSuccess, (state, payload) => {
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
  on(listingActions.UpdateFailure, (state, error) => {
    return {
      ...state,
      error: error,
    };
  }),

  // DELETE
  /*
  on(listingActions.Delete, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),
  */
  on(listingActions.DeleteSuccess, (state, payload) => {
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
  on(listingActions.Retrieve, (state: ListingState, payload) => {
    return {
      ...state,
      result: {},
      status: Statuses.LOADING,
    };
  }),
  on(listingActions.RetrieveSuccess, (state: ListingState, payload) => {
    return {
      ...state,
      result: payload.result,
      status: Statuses.LOADED,
    };
  }),

  // GET
  on(listingActions.Get, (state: ListingState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(
    listingActions.GetSuccess,
    (state: ListingState, { results, next, previous, isLoadMore }) => {
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
  on(listingActions.UpdateLocationSuccess, (state: ListingState, payload) => {
    return {
      ...state,
      result: { ...state.result, location: payload.location },
      status: Statuses.LOADED,
    };
  }),

  // SET DEFAULT
  on(listingActions.SetDefaultSuccess, (state: ListingState, payload) => {
    return {
      ...state,
      status: Statuses.LOADED,
    };
  })
);

export function listingReducer(
  state: ListingState | undefined,
  action: Action
) {
  return _listingReducer(state, action);
}
