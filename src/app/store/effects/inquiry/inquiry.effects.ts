import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { InquiryService } from 'src/app/services/inquiry/inquiry.service';
import * as proposeActions from '../../actions/propose.actions';
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
  Update,
  UpdateFailure,
  UpdateSuccess,
} from '../../actions/inquiry.actions';

@Injectable()
export class InquiryEffects {
  constructor(
    private actions$: Actions,
    private inquiryService: InquiryService
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Create),
      mergeMap((action) => {
        return this.inquiryService.doCreate({ ...action.data }).pipe(
          map((result) => {
            return CreateSuccess({
              result: result,
            });
          }),
          catchError(async (error) => CreateFailure({ error: error }))
        );
      })
    )
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Update),
      mergeMap((payload) => {
        return this.inquiryService
          .doUpdate({ ...payload.data }, payload.uuid)
          .pipe(
            map((result) => {
              return UpdateSuccess({
                result: result,
              });
            }),
            catchError(async (error) => UpdateFailure({ error: error }))
          );
      })
    )
  );

  // RETRIEVE
  retrieve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Retrieve),
      mergeMap((payload) => {
        return this.inquiryService.doRetrieve(payload.uuid).pipe(
          map((result) => {
            return RetrieveSuccess({
              result: result,
            });
          })
        );
      })
    )
  );

  /*
  retrieveSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RetrieveSuccess),
        map((payload) => {
          return proposeActions.GetOfferPropose({
            inquiry_uuid: payload?.result?.uuid,
          });
        })
      ),
    { dispatch: true }
  );
  */

  // DELETE
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Delete),
      mergeMap((payload) => {
        return this.inquiryService.doDelete(payload.uuid).pipe(
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

  // GET
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Get),
      mergeMap((payload) => {
        return this.inquiryService
          .doList({ obtain: payload.obtain, keyword: payload.keyword })
          .pipe(
            map((response) =>
              GetSuccess({
                results: response?.results,
                next: response?.next,
                previous: response?.previous,
              })
            )
          );
      })
    )
  );

  loadMore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetLoadMore),
      mergeMap((payload) => {
        return this.inquiryService.doList({ next: payload?.next }).pipe(
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
