import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { PartnerService } from 'src/app/services/partner/partner.service';
import {
  Create,
  CreateFailure,
  CreateSuccess,
  Delete,
  DeleteSuccess,
  Get,
  GetLoadMore,
  GetSuccess,
  Retrieve,
  RetrieveSuccess,
  SetDefault,
  SetDefaultSuccess,
  Update,
  UpdateFailure,
  UpdateLocation,
  UpdateLocationSuccess,
  UpdateSuccess,
} from '../../actions/partner.actions';

@Injectable()
export class PartnerEffects {
  constructor(
    private actions$: Actions,
    private partnerService: PartnerService,
    private router: Router,
    private location: Location
  ) {}

  // RETRIEVE
  retrieve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Retrieve),
      mergeMap((payload) => {
        return this.partnerService.doRetrieve(payload.uuid).pipe(
          map((result) => {
            return RetrieveSuccess({
              result: result,
            });
          })
        );
      })
    )
  );

  // GET
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Get),
      mergeMap((payload) => {
        return this.partnerService.doList({ ...payload }).pipe(
          map((response) => {
            return GetSuccess({
              results: response?.results,
              next: response?.next,
              previous: response?.previous,
            });
          })
        );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetLoadMore),
      mergeMap((payload) => {
        return this.partnerService.doList({ next: payload?.next }).pipe(
          map((response) =>
            GetSuccess({
              results: response?.results,
              next: response?.next,
              previous: response?.previous,
              isLoadMore: payload?.isLoadMore,
            })
          )
        );
      })
    )
  );
}
