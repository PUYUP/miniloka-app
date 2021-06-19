import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProposeState } from '../reducers/propose.reducers';

export const proposeState = createFeatureSelector<ProposeState>('propose');

export const SelectPropose = createSelector(
  proposeState,
  (state: ProposeState) => {
    return state;
  }
);

export const SelectProposes = createSelector(
  proposeState,
  (state: ProposeState) => state
);

export const RetrievePropose = createSelector(
  proposeState,
  (state: ProposeState, props: any) => {
    if (state.results.length > 0) {
      return state.results.find((d: any) => d.uuid == props?.uuid);
    } else {
      return state;
    }
  }
);
