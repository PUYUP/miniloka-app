import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PersonService } from 'src/app/services/person/person.service';
import {
  GetUser,
  GetUserSuccess,
  Logout,
  LogoutSuccess,
  UpdateProfile,
  UpdateProfileSuccess,
  UpdateSecurity,
  UpdateSecurityFailure,
  UpdateSecuritySuccess,
} from '../../actions/person.actions';
import { InvokeReset } from '../../actions/verifycode.actions';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private personService: PersonService,
    private router: Router
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUser),
      map(() => {
        let user = this.authService.user;
        return GetUserSuccess({ user: user });
      })
    )
  );

  // LOGOUT
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Logout),
      mergeMap(() => {
        return this.personService
          .logout()
          .pipe(map((response) => LogoutSuccess()));
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogoutSuccess),
        tap(() => {
          this.router.navigate(['intro'], { replaceUrl: true });
          this.authService.clearCredential();
        })
      ),
    { dispatch: false }
  );

  // PROFILE
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateProfile),
      mergeMap((action) => {
        return this.personService.updateProfile({ ...action.profile }).pipe(
          map((reseponse) => {
            return UpdateProfileSuccess({ profile: reseponse });
          })
        );
      })
    )
  );

  updateProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UpdateProfileSuccess),
        mergeMap(() => {
          return this.personService.getUser().pipe(
            map((response) => {
              this.authService.storeUser(response);
            })
          );
        })
      ),
    { dispatch: false }
  );

  // SECURITY
  updateSecurity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateSecurity),
      mergeMap((action) => {
        return this.personService.updateSecurity({ ...action.security }).pipe(
          map((reseponse) => {
            return UpdateSecuritySuccess({ security: reseponse });
          })
        );
      })
    )
  );

  updateSecuritySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UpdateSecuritySuccess),
        mergeMap(() => {
          // reset verifycode
          InvokeReset();

          return this.personService.getUser().pipe(
            map((response) => {
              this.authService.storeUser(response);
            })
          );
        })
      ),
    { dispatch: false }
  );

  updateSecurityFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UpdateSecurityFailure),
        map((error) => error)
      ),
    { dispatch: false }
  );
}
