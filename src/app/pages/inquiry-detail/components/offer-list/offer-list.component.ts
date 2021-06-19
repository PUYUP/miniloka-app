import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  GetLoadMore,
  GetOfferPropose,
} from 'src/app/store/actions/propose.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectProposes } from 'src/app/store/selectors/propose.selectors';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  @Input('uuid') uuid: string;

  proposes$: Observable<any>;
  loadMoreEvent: any;
  next: string;
  previous: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(GetOfferPropose({ inquiry_uuid: this.uuid }));
    this.proposes$ = this.store.pipe(select(SelectProposes));
    this.proposes$.subscribe((state) => {
      this.next = state?.next;
      this.previous = state?.previous;

      if (this.loadMoreEvent) {
        if (state?.isLoadMore) this.loadMoreEvent.target.complete();
        this.loadMoreEvent.target.disabled = !this.next ? true : false;
      }
    });
  }

  refresh() {
    this.store.dispatch(GetOfferPropose({ inquiry_uuid: this.uuid }));
  }

  loadMore(event: any) {
    this.loadMoreEvent = event;

    if (this.next) {
      this.store.dispatch(GetLoadMore({ next: this.next, isLoadMore: true }));
    }

    this.loadMoreEvent.target.disabled = !this.next ? true : false;
  }
}
