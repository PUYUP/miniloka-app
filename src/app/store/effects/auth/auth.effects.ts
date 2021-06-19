import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  Login,
  LoginFailure,
  LoginSuccess,
  PasswordRecovery,
  PasswordRecoveryFailure,
  PasswordRecoverySuccess,
  Register,
  RegisterFailure,
  RegisterSuccess,
} from '../../actions/auth.actions';
import { InvokeReset } from '../../actions/verifycode.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }

  // LOGIN
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login),
      mergeMap((action) => {
        return this.authService.login({ ...action.credential }).pipe(
          map((action) => {
            return LoginSuccess({
              result: {
                token: action.token,
                user: action.user,
              },
            });
          }),
          catchError(async (error) => LoginFailure({ error: error }))
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginSuccess),
        tap((action) => {
          this.authService.storeToken(action.result.token);
          this.authService.storeUser(action.result.user);

          this.router.navigate([''], { replaceUrl: true });
        })
      ),
    { dispatch: false }
  );

  // REGISTER
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Register),
      switchMap((action) => {
        return this.authService.register({ ...action.credential }).pipe(
          map((response) => {
            return RegisterSuccess({
              result: {
                ...response,
                retype_password: action.credential.retype_password,
              },
            });
          }),
          catchError((error) => {
            return of(
              RegisterFailure({
                error: error,
              })
            );
          })
        );
      })
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterSuccess),
      map((action) => {
        // reset verifycode
        InvokeReset();

        return Login({
          credential: {
            username: action.result.email,
            password: action.result.retype_password,
          },
        });
      })
    )
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterFailure),
        map((error) => error)
      ),
    { dispatch: false }
  );

  // PASSWORD RECOVERY
  passwordRecovery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PasswordRecovery),
      mergeMap((action) => {
        return this.authService.passwordRecovery({ ...action.credential }).pipe(
          map((response) => PasswordRecoverySuccess()),
          catchError(async (error) => PasswordRecoveryFailure({ error: error }))
        );
      })
    )
  );

  passwordRecoverySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PasswordRecoverySuccess),
        tap(() => {
          this.presentToast('Berhasil! Login dengan password baru.');
          this.router.navigate(['/login'], { replaceUrl: true });

          // reset verifycode
          return InvokeReset();
        })
      ),
    { dispatch: false }
  );
}
