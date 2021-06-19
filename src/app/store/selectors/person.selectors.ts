import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PersonState } from '../reducers/person.reducers';

export const personState = createFeatureSelector<PersonState>('person');

export const SelectPerson = createSelector(
  personState,
  (state: PersonState) => state
);

export const SelectProfile = createSelector(
  personState,
  (state: PersonState) => state.result?.profile
);

export const SelectSecurity = createSelector(
  personState,
  (state: PersonState) => {
    return {
      username: state.result?.username,
      email: state.result?.email,
      is_email_verified: state.result?.is_email_verified,
      msisdn: state.result?.msisdn,
      is_msisdn_verified: state.result?.is_msisdn_verified,
    };
  }
);
