import { Action, createReducer, on } from '@ngrx/store';
import { Statuses } from 'src/app/app.constants';
import * as offerActions from '../actions/offer.actions';

export const offerFeatureName = 'offer';

export interface OfferState {
  result?: any; // from created
  results?: any[];
  error: any;
  status: any;
}

export const initialOfferState: OfferState = {
  result: {},
  results: [],
  error: null,
  status: Statuses.UNINITIALIZED,
};

const _offerReducer = createReducer(
  initialOfferState,

  // GET HISTORY
  on(offerActions.GetHistory, (state: OfferState) => {
    return {
      ...state,
      results: [],
      status: Statuses.LOADING,
    };
  }),
  on(offerActions.GetHistorySuccess, (state: OfferState, payload) => {
    let x = [];

    if (payload?.newest_offer) {
      x = [payload?.newest_offer, ...state.results];
    } else {
      x = [...state.results, ...payload?.results];
    }

    return {
      ...state,
      results: x,
      next: payload.next,
      previous: payload.previous,
      status: Statuses.LOADED,
      isLoadMore: payload.isLoadMore,
    };
  })
);

export function offerReducer(state: OfferState | undefined, action: Action) {
  return _offerReducer(state, action);
}
