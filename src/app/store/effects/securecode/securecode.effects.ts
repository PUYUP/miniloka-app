import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { SecureCodeService } from 'src/app/services/securecode/securecode.service';
import {
  Invoke,
  InvokeFailure,
  InvokeResend,
  InvokeSuccess,
  Validate,
  ValidateFailure,
  ValidateSuccess,
} from '../../actions/securecode.actions';

@Injectable()
export class SecureCodeEffects {
  constructor(
    private actions$: Actions,
    private securecodeService: SecureCodeService,
    private router: Router
  ) {}

  // INVOKE
  invoke$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Invoke),
      mergeMap((action) => {
        return this.securecodeService.doInvoke({ ...action.data }).pipe(
          map((result) => {
            return InvokeSuccess({
              result: result,
            });
          }),
          catchError(async (error) => InvokeFailure({ error: error }))
        );
      })
    )
  );

  invokeResend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvokeResend),
      mergeMap((action) => {
        return this.securecodeService.doInvoke({ ...action.data }).pipe(
          map((result) => {
            return InvokeSuccess({
              result: result,
            });
          }),
          catchError(async (error) => InvokeFailure({ ...error }))
        );
      })
    )
  );

  invokeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InvokeSuccess),
        tap((result) => result)
      ),
    { dispatch: false }
  );

  // VALIDATE
  validate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Validate),
      mergeMap((action) => {
        return this.securecodeService.doValidate({ ...action.data }).pipe(
          map((result) => {
            return ValidateSuccess({
              result: result,
            });
          }),
          catchError(async (error) => ValidateFailure({ error: error }))
        );
      })
    )
  );

  validateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ValidateSuccess),
        tap((result) => result)
      ),
    { dispatch: false }
  );
}
