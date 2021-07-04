import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectPropose } from 'src/app/store/selectors/propose.selectors';
import { OfferHistoryComponent } from './components/offer-history/offer-history.component';
import { ProposeEditorComponent } from './components/propose-editor/propose-editor.component';

@Component({
  selector: 'app-inquiry-send-propose',
  templateUrl: './inquiry-send-propose.page.html',
  styleUrls: ['./inquiry-send-propose.page.scss'],
})
export class InquirySendProposePage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;

  @ViewChild(ProposeEditorComponent)
  proposeEditorComponent: ProposeEditorComponent;

  @ViewChild(OfferHistoryComponent)
  offerHistoryComponent: OfferHistoryComponent;

  inquiry_uuid: string;
  listing_uuid: string;

  propose$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.propose$ = this.store.pipe(select(SelectPropose));
    this.propose$.subscribe((state: any) => {
      if (this.content && state?.status == 'loaded') this.content.scrollToTop();
    });
  }

  ngOnInit() {
    this.inquiry_uuid =
      this.activatedRoute.snapshot.paramMap.get('inquiry_uuid');

    this.listing_uuid =
      this.activatedRoute.snapshot.paramMap.get('listing_uuid');
  }

  doRefresh(event: any) {
    this.proposeEditorComponent.refresh(event);
    this.offerHistoryComponent.refresh();
  }
}
