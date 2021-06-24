import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Get, GetLoadMore } from 'src/app/store/actions/inquiry.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectInquiries } from 'src/app/store/selectors/inquiry.selectors';
import { SelectListing } from 'src/app/store/selectors/listing.selectors';

@Component({
  selector: 'app-inquiry-list-hunt',
  templateUrl: './inquiry-list-hunt.component.html',
  styleUrls: ['./inquiry-list-hunt.component.scss'],
})
export class InquiryListHuntComponent implements OnInit {
  @Input('keyword') keyword: any;
  @Input('listing_uuid') listing_uuid: string;

  inquiries$: Observable<any>;
  listing$: Observable<any>;

  loadMoreEvent: any;
  next: string;
  previous: string;

  constructor(private store: Store<AppState>) {
    this.listing$ = this.store.pipe(select(SelectListing));
    this.listing$.subscribe((state: any) => {
      if (state?.is_updated) {
        this.keyword = state?.keyword;
        this.getListing();
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getListing();
    });
  }

  getListing() {
    this.store.dispatch(Get({ obtain: 'hunt', keyword: this.keyword }));
    this.inquiries$ = this.store.pipe(select(SelectInquiries));
    this.inquiries$.subscribe((res) => {
      this.next = res?.next;
      this.previous = res?.previous;

      if (this.loadMoreEvent) {
        if (res?.isLoadMore) this.loadMoreEvent.target.complete();
        this.loadMoreEvent.target.disabled = !this.next ? true : false;
      }
    });
  }

  refresh() {
    this.store.dispatch(Get({ obtain: 'hunt', keyword: this.keyword }));
  }

  loadMore(event: any) {
    this.loadMoreEvent = event;

    if (this.next) {
      this.store.dispatch(GetLoadMore({ next: this.next, isLoadMore: true }));
    }

    this.loadMoreEvent.target.disabled = !this.next ? true : false;
  }
}
