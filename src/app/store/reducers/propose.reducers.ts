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
  on(proposeActions.Create, (state, payload) => {
    return {
      ...state,
      status: Statuses.LOADING,
    };
  }),
  on(proposeActions.CreateSuccess, (state, payload) => {
    return {
      ...state,
      result: payload.result,
      results: [{ ...payload.result }, ...state.results],
      status: Statuses.LOADED,
    };
  }),
  on(proposeActions.CreateFailure, (state, error) => {
    return {
      ...state,
      error: error,
      status: Statuses.UNINITIALIZED,
    };
  }),

  // UPDATE
  on(proposeActions.Update, (state, payload) => {
    let results = [...state.results];
    let res = results.map((d: any) => {
      if (d.uuid == payload?.uuid) {
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
  on(proposeActions.UpdateSuccess, (state, payload) => {
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
  on(proposeActions.UpdateFailure, (state, error) => {
    return {
      ...state,
      error: error,
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
      result: {},
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
    let from_order = payload?.result?.from_order;
    let order_data = payload?.result?.order_data;
    let result = state?.result;

    if (from_order) {
      let newest_offer = state?.result?.newest_offer;
      let newest_offer_items = newest_offer?.items;
      let order_items = order_data?.items;
      let x = {};

      // Inject is_offered
      x = newest_offer_items.map((d: any) => {
        let y = order_items.find((dy: any) => dy.offer_item == d.uuid);

        if (y) {
          d = { ...d, is_ordered: true };
        } else {
          d = { ...d, is_ordered: false };
        }

        return d;
      });

      result = {
        ...state.result,
        newest_offer: {
          ...state.result?.newest_offer,
          is_ordered: true,
          items: x,
          order: order_data,
        },
      };
    } else {
      let newest_offer = payload?.result?.newest_offer;
      let newest_offer_items = newest_offer?.items;
      let order = newest_offer?.order;
      let order_items = order?.items;
      let x = {};

      result = payload?.result;

      // Inject is_offered
      if (order) {
        x = newest_offer_items.map((d: any) => {
          let y = order_items.find((dy: any) => dy.offer_item == d.uuid);

          if (y) {
            d = { ...d, is_ordered: true };
          } else {
            d = { ...d, is_ordered: false };
          }

          return d;
        });

        result = {
          ...payload.result,
          newest_offer: { ...payload.result?.newest_offer, items: x },
        };
      }
    }

    return {
      ...state,
      result: result,
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
