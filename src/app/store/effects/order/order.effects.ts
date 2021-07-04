import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order/order.service';
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
} from '../../actions/order.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Create),
      mergeMap((action) => {
        return this.orderService.doCreate({ ...action.data }).pipe(
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

  createSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateSuccess),
      map((payload) => {
        return proposeActions.RetrieveSuccess({
          result: { from_order: true, order_data: payload?.result },
        });
      })
    )
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Update),
      mergeMap((payload) => {
        return this.orderService
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
        return this.orderService.doRetrieve(payload.uuid).pipe(
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
            order_uuid: payload?.result?.uuid,
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
        return this.orderService.doDelete(payload.uuid).pipe(
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
        return this.orderService
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
        return this.orderService.doList({ next: payload?.next }).pipe(
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
