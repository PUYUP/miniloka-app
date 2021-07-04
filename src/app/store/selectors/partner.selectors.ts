import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartnerState } from '../reducers/partner.reducers';

export const partnerState = createFeatureSelector<PartnerState>('partner');

export const SelectPartner = createSelector(
  partnerState,
  (state: PartnerState) => {
    return state;
  }
);

export const SelectPartners = createSelector(
  partnerState,
  (state: PartnerState) => state
);

export const RetrievePartner = createSelector(
  partnerState,
  (state: PartnerState, props: any) => {
    if (state.results.length > 0) {
      return state.results.find((d: any) => d.uuid == props?.uuid);
    } else {
      return state;
    }
  }
);
