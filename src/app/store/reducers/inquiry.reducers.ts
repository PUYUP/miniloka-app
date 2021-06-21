import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as inquiryActions from '../actions/inquiry.actions';

export const inquiryFeatureName = 'inquiry';

export interface InquiryState {
  result?: any; // from created
  results?: any[];
  error: any;
  status: any;
}

export const initialInquiryState: InquiryState = {
  result: {},
  results: [],
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _inquiryReducer = createReducer(
  initialInquiryState,

  // CREATE
  /*
  on(inquiryActions.Create, (state, payload) => {
    return {
      ...state,
      result: payload.data,
      results: [payload.data, ...state.results],
      status: Statuses.LOADING,
    };
  }),
  */
  on(inquiryActions.CreateSuccess, (state, payload) => {
    return {
      ...state,
      result: payload.result,
      results: [{ ...payload.result }, ...state.results],
      status: Statuses.LOADED,
    };
  }),

  // UPDATE
  on(inquiryActions.Update, (state, payload) => {
    let results = [...state.results];
    let index = results.findIndex((d: any) => d.uuid == payload.uuid);

    let items = payload.data.items.filter((d: any) => {
      if (!d?.is_delete) return d;
    });

    // replace items
    let data = { ...payload.data };
    data.items = items;

    results[index] = { ...results[index], ...data };

    return {
      ...state,
      result: payload.data,
      results: results,
      status: Statuses.LOADING,
    };
  }),
  on(inquiryActions.UpdateSuccess, (state, payload) => {
    let results = [...state.results];
    let index = results.findIndex((d: any) => d.uuid == state?.result.uuid);

    results[index] = { ...results[index], ...payload.result };

    return {
      ...state,
      results: results,
      status: Statuses.LOADED,
    };
  }),

  // DELETE
  /*
  on(inquiryActions.Delete, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),
  */
  on(inquiryActions.DeleteSuccess, (state, payload) => {
    let results = [...state.results];
    let x = results.filter((d: any) => d.uuid != payload.uuid);

    return {
      ...state,
      results: x,
      status: Statuses.LOADED,
    };
  }),

  // RETRIEVE
  on(inquiryActions.Retrieve, (state: InquiryState, payload) => {
    return {
      ...state,
      result: {},
      status: Statuses.LOADING,
    };
  }),
  on(inquiryActions.RetrieveSuccess, (state: InquiryState, payload) => {
    return {
      ...state,
      result: payload?.result
        ? { ...payload?.result, ...payload?.newest_offer }
        : { ...state.result, ...payload },
      status: Statuses.LOADED,
    };
  }),

  // GET
  on(inquiryActions.Get, (state: InquiryState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(inquiryActions.GetSuccess, (state: InquiryState, payload) => {
    let x = [];

    if (payload?.propose) {
      let z = [...state.results];

      let newest_offer = payload?.propose?.newest_offer;
      let cost = newest_offer?.cost
        ? newest_offer?.cost
        : newest_offer?.total_item_cost;

      let o = z.map((d: any) => {
        let u = d;

        if (d.uuid == payload?.propose?.inquiry) {
          u = { ...d, newest_offer_cost: cost, is_offered: true };
        }

        return u;
      });

      x = o;
    } else {
      x = [...state.results, ...payload?.results];
    }

    return {
      ...state,
      results: x,
      next: payload?.next,
      previous: payload?.previous,
      status: Statuses.LOADED,
      isLoadMore: payload?.isLoadMore,
    };
  })
);

export function inquiryReducer(
  state: InquiryState | undefined,
  action: Action
) {
  return _inquiryReducer(state, action);
}
