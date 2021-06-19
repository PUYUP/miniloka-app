import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VerifycodeState, VerifycodeValidateState } from '../reducers/verifycode.reducers';

export const verifycodeState = createFeatureSelector<VerifycodeState>('verifycode');
export const verifycodeValidateState = createFeatureSelector<VerifycodeValidateState>('verifycode_validate');

export const SelectVerifycode = createSelector(
  verifycodeState,
  (state: VerifycodeState) => state
);

export const SelectVerifycodeValidate = createSelector(
  verifycodeValidateState,
  (state: VerifycodeValidateState) => state
);
