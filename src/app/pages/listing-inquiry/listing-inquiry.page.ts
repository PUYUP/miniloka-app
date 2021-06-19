import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InquiryListHuntComponent } from 'src/app/components/inquiry-list-hunt/inquiry-list-hunt.component';
import { Retrieve, SetDefault } from 'src/app/store/actions/listing.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectInquiries } from 'src/app/store/selectors/inquiry.selectors';
import { SelectListing } from 'src/app/store/selectors/listing.selectors';

@Component({
  selector: 'app-listing-inquiry',
  templateUrl: './listing-inquiry.page.html',
  styleUrls: ['./listing-inquiry.page.scss'],
})
export class ListingInquiryPage implements OnInit {
  @ViewChild(InquiryListHuntComponent)
  inquiryListHuntComponent: InquiryListHuntComponent;

  listing$: Observable<any>;
  inquiries$: Observable<any>;
  listingSubscribe: any;
  listing_uuid: string;
  showInquiry: boolean = false;
  refreshEvent: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.listing_uuid =
      this.activatedRoute.snapshot.paramMap.get('listing_uuid');

    this.store.dispatch(Retrieve({ uuid: this.listing_uuid }));
    this.listing$ = this.store.pipe(
      select(SelectListing, { uuid: this.listing_uuid })
    );

    this.listingSubscribe = this.listing$.subscribe((state: any) => {
      setTimeout(() => {
        this.showInquiry = true;
      }, 1000);
    });

    this.inquiries$ = this.store.pipe(select(SelectInquiries));
    this.inquiries$.subscribe((state: any) => {
      if (this.refreshEvent) this.refreshEvent.target.complete();
    });

    // Set default
    this.store.dispatch(SetDefault({ uuid: this.listing_uuid }));
  }

  doRefresh(event: any) {
    this.refreshEvent = event;
    this.inquiryListHuntComponent.refresh();
  }

  ngOnDestroy() {
    this.listingSubscribe.unsubscribe();
  }
}
