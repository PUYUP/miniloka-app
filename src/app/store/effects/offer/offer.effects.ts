import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { OfferService } from 'src/app/services/offer/offer.service';
import {
  GetHistory,
  GetHistoryLoadMore,
  GetHistorySuccess,
} from '../../actions/offer.actions';

@Injectable()
export class OfferEffects {
  constructor(
    private actions$: Actions,
    private offerService: OfferService,
    private router: Router,
    private location: Location
  ) {}

  // GET HISTORY
  getHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetHistory),
      mergeMap((payload) => {
        return this.offerService
          .doList({ inquiry_uuid: payload.inquiry_uuid })
          .pipe(
            map((response) => {
              return GetHistorySuccess({
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
      ofType(GetHistoryLoadMore),
      mergeMap((payload) => {
        return this.offerService.doList({ next: payload?.next }).pipe(
          map((response) =>
            GetHistorySuccess({
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
