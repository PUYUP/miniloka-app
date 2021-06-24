import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ListingService } from 'src/app/services/listing/listing.service';
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
} from '../../actions/listing.actions';

@Injectable()
export class ListingEffects {
  constructor(
    private actions$: Actions,
    private listingService: ListingService,
    private router: Router,
    private location: Location
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Create),
      mergeMap((action) => {
        return this.listingService.doCreate({ ...action.data }).pipe(
          map((result) => {
            return CreateSuccess({
              result: { ...result, is_created: true },
            });
          }),
          catchError(async (error) => CreateFailure({ error: error }))
        );
      })
    )
  );

  createSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateSuccess),
        tap((payload) => {
          this.router.navigate(['/listing-inquiry', payload.result.uuid]);
          return payload;
        })
      ),
    { dispatch: false }
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Update),
      mergeMap((payload) => {
        return this.listingService
          .doUpdate({ ...payload.data }, payload.uuid)
          .pipe(
            map((result) => {
              return UpdateSuccess({
                result: { ...result, is_updated: true },
                uuid: payload.uuid,
              });
            }),
            catchError(async (error) =>
              UpdateFailure({ error: error, uuid: payload.uuid })
            )
          );
      })
    )
  );

  // RETRIEVE
  retrieve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Retrieve),
      mergeMap((payload) => {
        return this.listingService.doRetrieve(payload.uuid).pipe(
          map((result) => {
            return RetrieveSuccess({
              result: result,
            });
          })
        );
      })
    )
  );

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Delete),
      mergeMap((payload) => {
        return this.listingService.doDelete(payload.uuid).pipe(
          map((result) => {
            return DeleteSuccess({
              uuid: payload.uuid,
            });
          }),
          catchError(async (error) => CreateFailure({ error: error }))
        );
      })
    )
  );

  deleteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DeleteSuccess),
        tap((result) => {
          this.router.navigate(['/'], { replaceUrl: true });
          return result;
        })
      ),
    { dispatch: false }
  );

  // GET
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Get),
      mergeMap((payload) => {
        return this.listingService.doList().pipe(
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
        return this.listingService.doList({ next: payload?.next }).pipe(
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

  // UPDATE LOCATION
  updateLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateLocation),
      switchMap((action) => {
        return this.listingService
          .doUpdateLocation(action.location.listing, action.location)
          .pipe(
            map((response) =>
              UpdateLocationSuccess({
                location: { ...response, is_updated: true },
              })
            )
          );
      })
    )
  );

  // SET DEFAULT
  setDefault$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetDefault),
      switchMap((action) => {
        return this.listingService
          .doSetDefault(action.uuid)
          .pipe(map((response) => SetDefaultSuccess()));
      })
    )
  );
}
