import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectListing } from 'src/app/store/selectors/listing.selectors';
import { ListingEditorComponent } from '../listing-editor/listing-editor.component';

@Component({
  selector: 'app-listing-editor-modal',
  templateUrl: './listing-editor-modal.component.html',
  styleUrls: ['./listing-editor-modal.component.scss'],
})
export class ListingEditorModalComponent implements OnInit {
  @ViewChild(ListingEditorComponent, { static: true })
  childEl: ListingEditorComponent;

  listing$: Observable<any>;

  constructor(
    private modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.listing$ = this.store.pipe(select(SelectListing));
    this.listing$.subscribe((state) => {
      if (state?.result?.is_created) this.dismiss();
    });
  }

  ngOnInit() {}

  dismiss() {
    if (this.modalController.getTop()) {
      this.modalController.dismiss({
        dismissed: true,
      });
    }
  }
}
