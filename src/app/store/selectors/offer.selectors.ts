import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferState } from '../reducers/offer.reducers';

export const offerState = createFeatureSelector<OfferState>('offer');

export const SelectOfferHistory = createSelector(
  offerState,
  (state: OfferState) => state
);
