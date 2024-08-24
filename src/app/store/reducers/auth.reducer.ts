import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

export interface AuthState {
  isLoggedIn: boolean;
  name: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  name: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { name}) => ({
    ...state,
    isLoggedIn: true,
    name,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    name: null,
    error
  })),
  on(AuthActions.logout, state => ({ ...state, isLoggedIn: false, name: null })) // Handle logout action

);
