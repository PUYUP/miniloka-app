import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export const authState = createFeatureSelector<AuthState>('auth');

export const SelectAuth = createSelector(
  authState,
  (state: AuthState) => state
);
