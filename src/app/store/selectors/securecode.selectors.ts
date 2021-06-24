import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SecureCodeState,
  SecureCodeValidateState,
} from '../reducers/securecode.reducers';

export const securecodeState =
  createFeatureSelector<SecureCodeState>('securecode');
export const securecodeValidateState =
  createFeatureSelector<SecureCodeValidateState>('securecode_validate');

export const SelectSecureCode = createSelector(
  securecodeState,
  (state: SecureCodeState) => state
);

export const SelectSecureCodeValidate = createSelector(
  securecodeValidateState,
  (state: SecureCodeValidateState) => state
);
