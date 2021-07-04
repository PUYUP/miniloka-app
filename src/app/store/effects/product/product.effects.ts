import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';
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
} from '../../actions/product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Create),
      mergeMap((action) => {
        return this.productService.doCreate({ ...action.data }).pipe(
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
          result: { from_product: true, product_data: payload?.result },
        });
      })
    )
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Update),
      mergeMap((payload) => {
        return this.productService
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
        return this.productService.doRetrieve(payload.uuid).pipe(
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
            product_uuid: payload?.result?.uuid,
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
        return this.productService.doDelete(payload.uuid).pipe(
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
        return this.productService
          .doList({ listing_uuid: payload.listing_uuid })
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
        return this.productService.doList({ next: payload?.next }).pipe(
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
