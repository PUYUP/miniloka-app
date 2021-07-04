import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as orderActions from '../actions/order.actions';

export const orderFeatureName = 'order';

export interface OrderState {
  result?: any; // from created
  results?: any[];
  error: any;
  status: any;
}

export const initialOrderState: OrderState = {
  result: {},
  results: [],
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _orderReducer = createReducer(
  initialOrderState,

  // CREATE
  /*
  on(orderActions.Create, (state, payload) => {
    return {
      ...state,
      result: payload.data,
      results: [payload.data, ...state.results],
      status: Statuses.LOADING,
    };
  }),
  */
  on(orderActions.CreateSuccess, (state, payload) => {
    return {
      ...state,
      result: payload.result,
      results: [{ ...payload.result }, ...state.results],
      status: Statuses.LOADED,
    };
  }),
  on(orderActions.CreateFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),

  // DELETE
  /*
  on(orderActions.Delete, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),
  */
  on(orderActions.DeleteSuccess, (state, payload) => {
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
  on(orderActions.Retrieve, (state: OrderState, payload) => {
    return {
      ...state,
      result: {},
      status: Statuses.LOADING,
    };
  }),
  on(orderActions.RetrieveSuccess, (state: OrderState, payload) => {
    return {
      ...state,
      result: payload?.result,
      status: Statuses.LOADED,
    };
  }),

  // GET
  on(orderActions.Get, (state: OrderState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(orderActions.GetSuccess, (state: OrderState, payload) => {
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

export function orderReducer(state: OrderState | undefined, action: Action) {
  return _orderReducer(state, action);
}
