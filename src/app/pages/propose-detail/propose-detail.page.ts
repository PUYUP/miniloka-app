import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Create } from 'src/app/store/actions/order.actions';
import { Retrieve } from 'src/app/store/actions/propose.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectPropose } from 'src/app/store/selectors/propose.selectors';

@Component({
  selector: 'app-propose-detail',
  templateUrl: './propose-detail.page.html',
  styleUrls: ['./propose-detail.page.scss'],
})
export class ProposeDetailPage implements OnInit {
  uuid: string;
  inquiry_uuid: string;
  offer_uuid: string;
  whatsapp_number: number;
  selectedOfferItems: any = <any>[];
  refreshEvent: any;
  propose$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    public alertController: AlertController
  ) {}

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      subHeader: 'Minta kode rahasia ke penawar',
      inputs: [
        {
          name: 'secret',
          type: 'text',
          id: 'secret',
          placeholder: 'Kode rahasia',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Submit',
          handler: (event: any) => {
            this.acceptOffer(event?.secret);
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');

    this.store.dispatch(Retrieve({ uuid: this.uuid }));
    this.propose$ = this.store.pipe(select(SelectPropose));
    this.propose$.subscribe((state: any) => {
      this.inquiry_uuid = state?.result?.inquiry;
      this.offer_uuid = state?.result?.newest_offer?.uuid;

      let whatsapp = state?.result?.listing?.contact?.whatsapp;
      if (whatsapp) {
        let x = whatsapp.split('');
        if (x[0] == 0) {
          x[0] = 62;
        }

        this.whatsapp_number = x.join('');
      }

      // set offer_items
      this.selectedOfferItems = state?.result?.newest_offer?.items.map(
        (d: any) => {
          return { [d.uuid]: d.is_ordered };
        }
      );

      if (this.refreshEvent) this.refreshEvent.target.complete();
    });
  }

  openMap(location: any) {
    let destination = location?.latitude + ',' + location?.longitude;
    window.open(
      'https://www.google.com/maps/search/?api=1&query=' + destination
    );
  }

  confirmOffer() {
    this.presentAlertPrompt();
  }

  acceptOffer(secret: string) {
    let items = [];
    let items_all = [];

    for (let index in this.selectedOfferItems) {
      let x = this.selectedOfferItems[index];
      let k = Object.keys(x);
      let z = x[k[0]];
      let d = { offer_item: k[0] };

      if (z) items.push(d);
      items_all.push(d);
    }

    let data = {
      inquiry: this.inquiry_uuid,
      offer: this.offer_uuid,
      items: items.length > 0 ? items : items_all,
      secret: secret,
    };

    this.store.dispatch(Create({ data: data }));
  }

  doRefresh(event: any) {
    this.refreshEvent = event;
    this.store.dispatch(Retrieve({ uuid: this.uuid, is_refresh: true }));
  }
}
