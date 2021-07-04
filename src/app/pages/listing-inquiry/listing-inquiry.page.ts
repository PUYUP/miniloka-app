import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InquiryListHuntComponent } from 'src/app/components/inquiry-list-hunt/inquiry-list-hunt.component';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { Retrieve, SetDefault } from 'src/app/store/actions/listing.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectInquiries } from 'src/app/store/selectors/inquiry.selectors';
import { SelectListing } from 'src/app/store/selectors/listing.selectors';
import { SelectProducts } from 'src/app/store/selectors/product.selectors';

@Component({
  selector: 'app-listing-inquiry',
  templateUrl: './listing-inquiry.page.html',
  styleUrls: ['./listing-inquiry.page.scss'],
})
export class ListingInquiryPage implements OnInit {
  @ViewChild(InquiryListHuntComponent)
  inquiryListHuntComponent: InquiryListHuntComponent;

  @ViewChild(ProductListComponent)
  productListComponent: ProductListComponent;

  listing$: Observable<any>;
  inquiries$: Observable<any>;
  products$: Observable<any>;

  listingSubscribe: any;
  listing_uuid: string;
  showInquiry: boolean = false;
  refreshEvent: any;
  segment: string = 'inquiry';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private platform: Platform,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      // Hide actionSheet
      this.actionSheetController
        .getTop()
        .then((v) => (v ? this.actionSheetController.dismiss() : null));

      // Hide modal
      this.modalController
        .getTop()
        .then((v) => (v ? this.modalController.dismiss() : null));
    });
  }

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

    // Inquiries
    this.inquiries$ = this.store.pipe(select(SelectInquiries));
    this.inquiries$.subscribe((state: any) => {
      if (this.refreshEvent) this.refreshEvent.target.complete();
    });

    // Products
    this.products$ = this.store.pipe(select(SelectProducts));
    this.products$.subscribe((state: any) => {
      if (this.refreshEvent) this.refreshEvent.target.complete();
    });

    // Set default
    this.store.dispatch(SetDefault({ uuid: this.listing_uuid }));
  }

  doRefresh(event: any) {
    this.refreshEvent = event;

    if (this.inquiryListHuntComponent) this.inquiryListHuntComponent.refresh();
    if (this.productListComponent) this.productListComponent.refresh();
  }

  segmentChanged(event: any) {
    this.segment = event.target.value;
  }

  ngOnDestroy() {
    this.listingSubscribe.unsubscribe();
  }
}
