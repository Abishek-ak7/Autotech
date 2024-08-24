import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.action';
import { LoginService } from '../../Services/login.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.loginService.login(action.loginDto).pipe(
          map(response => AuthActions.loginSuccess({ name: response.name})),
          catchError(error => of(AuthActions.loginFailure({ error: 'Login failed. Please try again later.' })))
        )
      )
    )
  );
}
