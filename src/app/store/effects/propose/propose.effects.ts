import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ProposeService } from 'src/app/services/propose/propose.service';
import { InquiryService } from 'src/app/services/inquiry/inquiry.service';
import {
  Create,
  CreateFailure,
  CreateSuccess,
  Delete,
  DeleteSuccess,
  Get,
  GetLoadMore,
  GetOfferPropose,
  GetSuccess,
  Retrieve,
  RetrieveSuccess,
  Update,
  UpdateSuccess,
} from '../../actions/propose.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as inquiryActions from '../../actions/inquiry.actions';
import * as offerActions from '../../actions/offer.actions';
import { Observable } from 'rxjs';

@Injectable()
export class ProposeEffects {
  constructor(
    private actions$: Actions,
    private proposeService: ProposeService,
    private inquiryService: InquiryService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // CREATE
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Create),
      mergeMap((action) => {
        return this.proposeService.doCreate({ ...action.data }).pipe(
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
      switchMap((payload) => [
        inquiryActions.RetrieveSuccess({
          newest_offer: payload?.result?.newest_offer,
        }),
        inquiryActions.GetSuccess({
          propose: payload?.result,
        }),
        offerActions.GetHistorySuccess({
          newest_offer: payload?.result?.newest_offer,
        }),
      ])
    )
  );

  // UPDATE
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Update),
      mergeMap((payload) => {
        return this.proposeService
          .doUpdate({ ...payload.data }, payload.uuid)
          .pipe(
            map((result) => {
              return UpdateSuccess({
                result: { ...result, is_updated: true },
                uuid: payload.uuid,
              });
            }),
            catchError(async (error) => CreateFailure({ error: error }))
          );
      })
    )
  );

  // RETRIEVE
  retrieve$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Retrieve),
      mergeMap((payload) => {
        return this.proposeService.doRetrieve(payload.uuid).pipe(
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
        return this.proposeService.doDelete(payload.uuid).pipe(
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
        return this.proposeService.doList().pipe(
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

  // GET INQUIRY PROPOSE
  getInquiryPropose$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetOfferPropose),
      mergeMap((payload) => {
        return this.inquiryService.doGetPropose(payload?.inquiry_uuid).pipe(
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
        return this.proposeService.doList({ next: payload?.next }).pipe(
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
