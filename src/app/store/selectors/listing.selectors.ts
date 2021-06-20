import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ListingState } from '../reducers/listing.reducers';

export const listingState = createFeatureSelector<ListingState>('listing');

export const SelectListing = createSelector(
  listingState,
  (state: ListingState) => {
    return state;
  }
);

export const SelectListings = createSelector(
  listingState,
  (state: ListingState) => state
);

export const RetrieveListing = createSelector(
  listingState,
  (state: ListingState, props: any) => {
    if (state.results.length > 0) {
      return state.results.find((d: any) => d.uuid == props?.uuid);
    } else {
      return state;
    }
  }
);
