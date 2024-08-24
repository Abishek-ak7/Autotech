import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const selectAuthName = createSelector(
  selectAuthState,
  (state: AuthState) => state.name
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
