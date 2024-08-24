import { createAction, props } from '@ngrx/store';
import { LoginDto } from '../../Services/login.service';

export const login = createAction(
  '[Auth] Login',
  props<{ loginDto: LoginDto }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ name: string}>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);