import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as productActions from '../actions/product.actions';

export const productFeatureName = 'product';

export interface ProductState {
  result?: any; // from created
  results?: any[];
  error: any;
  status: any;
}

export const initialProductState: ProductState = {
  result: {},
  results: [],
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _productReducer = createReducer(
  initialProductState,

  // CREATE
  /*
  on(productActions.Create, (state, payload) => {
    return {
      ...state,
      result: payload.data,
      results: [payload.data, ...state.results],
      status: Statuses.LOADING,
    };
  }),
  */
  on(productActions.CreateSuccess, (state, payload) => {
    return {
      ...state,
      result: payload.result,
      results: [{ ...payload.result }, ...state.results],
      status: Statuses.LOADED,
    };
  }),
  on(productActions.CreateFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),

  // UPDATE
  on(productActions.UpdateSuccess, (state, payload) => {
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
  on(productActions.UpdateFailure, (state, error) => {
    return {
      ...state,
      error: error,
    };
  }),

  // DELETE
  /*
  on(productActions.Delete, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),
  */
  on(productActions.DeleteSuccess, (state, payload) => {
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
  on(productActions.Retrieve, (state: ProductState, payload) => {
    return {
      ...state,
      result: {},
      status: Statuses.LOADING,
    };
  }),
  on(productActions.RetrieveSuccess, (state: ProductState, payload) => {
    return {
      ...state,
      result: payload?.result,
      status: Statuses.LOADED,
    };
  }),

  // GET
  on(productActions.Get, (state: ProductState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(productActions.GetSuccess, (state: ProductState, payload) => {
    return {
      ...state,
      results: [...state.results, ...payload?.results],
      next: payload?.next,
      previous: payload?.previous,
      status: Statuses.LOADED,
      isLoadMore: payload?.isLoadMore,
    };
  })
);

export function productReducer(
  state: ProductState | undefined,
  action: Action
) {
  return _productReducer(state, action);
}
