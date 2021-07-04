import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Retrieve } from 'src/app/store/actions/order.actions';
import { AppState } from 'src/app/store/reducers';
import { RetrieveOrder } from 'src/app/store/selectors/order.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input('uuid') uuid: string;

  order$: Observable<any>;

  constructor(
    private store: Store<AppState>,
    public alertController: AlertController
  ) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Informasi',
      message: 'Fitur ini dalam pengembangan. Mohon bersabar ya.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnInit() {
    this.store.dispatch(Retrieve({ uuid: this.uuid }));
    this.order$ = this.store.pipe(select(RetrieveOrder, { uuid: this.uuid }));
  }

  requestInstallment() {
    this.presentAlert();
  }
}
