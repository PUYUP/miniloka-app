import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Get } from 'src/app/store/actions/listing.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectListings } from 'src/app/store/selectors/listing.selectors';
import { ListingEditorModalComponent } from '../listing-editor-modal/listing-editor-modal.component';

@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.scss'],
})
export class ListingListComponent implements OnInit {
  listings$: Observable<any>;
  listingEditorIsPresent: boolean = false;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private platform: Platform
  ) {
    this.store.dispatch(Get());
    this.listings$ = this.store.pipe(select(SelectListings));

    if (this.modalController.getTop()) {
      this.platform.backButton.subscribeWithPriority(
        10,
        (processNextHandler) => {
          this.modalController.dismiss();

          processNextHandler();
        }
      );
    }
  }

  ngOnInit() {}

  async presentEdtitor() {
    const modal = await this.modalController.create({
      component: ListingEditorModalComponent,
      backdropDismiss: false,
      componentProps: {},
    });

    await modal.present().then(() => {
      this.listingEditorIsPresent = true;
    });

    const { role } = await modal.onDidDismiss();
    this.listingEditorIsPresent = false;
  }

  showEditor() {
    this.presentEdtitor();
  }

  refresh() {
    this.store.dispatch(Get());
  }
}
