import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { RetrieveInquiry } from 'src/app/store/selectors/inquiry.selectors';
import { DetailComponent } from './components/detail/detail.component';
import { OfferListComponent } from './components/offer-list/offer-list.component';

@Component({
  selector: 'app-inquiry-detail',
  templateUrl: './inquiry-detail.page.html',
  styleUrls: ['./inquiry-detail.page.scss'],
})
export class InquiryDetailPage implements OnInit {
  @ViewChild(DetailComponent) detailComponent: DetailComponent;
  @ViewChild(OfferListComponent) offerListComponent: OfferListComponent;

  uuid: string;
  refreshEvent: any;
  inquiry$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.inquiry$ = this.store.pipe(
      select(RetrieveInquiry, { uuid: this.uuid })
    );
    this.inquiry$.subscribe((state: any) => {
      if (this.refreshEvent) this.refreshEvent.target.complete();
    });
  }

  ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
  }

  doRefresh(event: any) {
    this.refreshEvent = event;

    this.detailComponent.refresh();
    this.offerListComponent.refresh();
  }
}
