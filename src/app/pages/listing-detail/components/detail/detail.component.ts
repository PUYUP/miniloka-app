import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Delete, Retrieve } from 'src/app/store/actions/listing.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectListing } from 'src/app/store/selectors/listing.selectors';
import { LocationEditorComponent } from '../location-editor/location-editor.component';
import { DetailEditorComponent } from '../detail-editor/detail-editor.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input('uuid') uuid: string;

  listing$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.store.dispatch(Retrieve({ uuid: this.uuid }));
    this.listing$ = this.store.pipe(select(SelectListing, { uuid: this.uuid }));
  }

  async editSummary(data: any) {
    const modal = await this.modalController.create({
      component: DetailEditorComponent,
      backdropDismiss: false,
      componentProps: {
        listing: data,
        uuid: this.uuid,
      },
    });

    await modal.present();
  }

  async editAddress(data: any) {
    const modal = await this.modalController.create({
      component: LocationEditorComponent,
      backdropDismiss: false,
      componentProps: {
        listing: data,
        uuid: this.uuid,
      },
    });

    await modal.present();
  }

  async confirmDeletePresent() {
    const alert = await this.alertController.create({
      subHeader: 'Apakah Anda yakin? Tindakan tidak bisa dikembalikan.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Yakin, Hapus!',
          handler: () => {
            this.store.dispatch(Delete({ uuid: this.uuid }));
          },
        },
      ],
    });

    await alert.present();
  }

  delete(data: any) {
    this.confirmDeletePresent();
  }
}
