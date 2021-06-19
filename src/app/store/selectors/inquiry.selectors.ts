import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InquiryState } from '../reducers/inquiry.reducers';

export const inquiryState = createFeatureSelector<InquiryState>('inquiry');

export const SelectInquiry = createSelector(
  inquiryState,
  (state: InquiryState) => state.result
);

export const SelectInquiries = createSelector(
  inquiryState,
  (state: InquiryState) => state
);

export const RetrieveInquiry = createSelector(
  inquiryState,
  (state: InquiryState, props: any) => {
    return state;
  }
);
