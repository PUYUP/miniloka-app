import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Retrieve } from 'src/app/store/actions/inquiry.actions';
import {
  GetHistory,
  GetHistoryLoadMore,
} from 'src/app/store/actions/offer.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectOfferHistory } from 'src/app/store/selectors/offer.selectors';
import { SelectPropose } from 'src/app/store/selectors/propose.selectors';

@Component({
  selector: 'app-offer-history',
  templateUrl: './offer-history.component.html',
  styleUrls: ['./offer-history.component.scss'],
})
export class OfferHistoryComponent implements OnInit {
  @Input('inquiry_uuid') inquiry_uuid: string;
  @Input('listing_uuid') listing_uuid: string;

  histories$: Observable<any>;
  loadMoreEvent: any;
  next: string;
  previous: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(GetHistory({ inquiry_uuid: this.inquiry_uuid }));
    this.histories$ = this.store.pipe(select(SelectOfferHistory));
    this.histories$.subscribe((res) => {
      this.next = res?.next;
      this.previous = res?.previous;

      if (this.loadMoreEvent) {
        if (res?.isLoadMore) this.loadMoreEvent.target.complete();
        this.loadMoreEvent.target.disabled = !this.next ? true : false;
      }
    });
  }

  loadMore(event: any) {
    this.loadMoreEvent = event;

    if (this.next) {
      this.store.dispatch(
        GetHistoryLoadMore({ next: this.next, isLoadMore: true })
      );
    }

    this.loadMoreEvent.target.disabled = !this.next ? true : false;
  }
}
