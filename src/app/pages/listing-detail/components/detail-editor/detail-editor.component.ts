import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectListing } from 'src/app/store/selectors/listing.selectors';

@Component({
  selector: 'app-detail-editor',
  templateUrl: './detail-editor.component.html',
  styleUrls: ['./detail-editor.component.scss'],
})
export class DetailEditorComponent implements OnInit {
  @Input('listing') listing: any;
  @Input('uuid') uuid: string;

  listing$: Observable<any>;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.listing$ = this.store.pipe(select(SelectListing, { uuid: this.uuid }));
    this.listing$.subscribe((payload: any) => {
      if (payload?.uuid && this.modalController.getTop()) this.dismiss();
    });
  }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
