import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ListingService } from 'src/app/services/listing/listing.service';
import { UpdateLocation } from 'src/app/store/actions/listing.actions';
import { AppState } from 'src/app/store/reducers';
import { ListingMapComponent } from '../location-map/location-map.component';

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.component.html',
  styleUrls: ['./location-editor.component.scss'],
})
export class LocationEditorComponent implements OnInit {
  @Input('listing') listing: any;

  listing$: any;
  formGroup: any = FormGroup;
  location: any;
  postalcode: any;
  latitude: any;
  selectedLatitude: any;
  longitude: any;
  selectedLongitude: any;
  autoGrow: boolean = false;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private fb: FormBuilder,
    private listingService: ListingService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    //this.listing$ = this.store.select('listing').subscribe((data) => {
    //  console.log(data);
    //});

    this.location = this.listing.location;
    this.selectedLatitude = this.location.latitude;
    this.selectedLongitude = this.location.longitude;

    this.formGroup = this.fb.group({
      street_address: [
        this.location?.street_address,
        [Validators.required, Validators.minLength(15)],
      ],

      // Province
      administrative_area_level_1: [
        this.location?.administrative_area_level_1,
        [Validators.required, Validators.minLength(4)],
      ],

      // City
      administrative_area_level_2: [
        this.location?.administrative_area_level_2,
        [Validators.required, Validators.minLength(4)],
      ],

      // District
      administrative_area_level_3: [
        this.location?.administrative_area_level_3,
        [Validators.required, Validators.minLength(4)],
      ],

      // Village
      administrative_area_level_4: [
        this.location?.administrative_area_level_4,
        [Validators.required, Validators.minLength(4)],
      ],

      // Postal Code
      postal_code: [
        this.location?.postal_code,
        [Validators.required, Validators.minLength(5)],
      ],

      // Geo-location
      latitude: [
        this.location?.latitude ? this.location?.latitude : '',
        [Validators.required],
      ],
      longitude: [
        this.location?.longitude ? this.location?.longitude : '',
        [Validators.required],
      ],
    });
  }

  ionViewDidEnter() {
    this.autoGrow = true;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ListingMapComponent,
      componentProps: {
        latitude: this.latitude,
        longitude: this.longitude,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data?.data.latitude && data?.data.longitude) {
        this.selectedLatitude = data?.data.latitude;
        this.selectedLongitude = data?.data.longitude;

        this.formGroup.patchValue({
          latitude: this.selectedLatitude,
          longitude: this.selectedLongitude,
        });
      }
    });

    return await modal.present();
  }

  onSubmit() {
    this.store.dispatch(
      UpdateLocation({
        location: { listing: this.listing.uuid, ...this.formGroup.value },
      })
    );

    this.dismiss();
  }

  async addMapMarker() {
    let province = this.formGroup.value.administrative_area_level_1;
    let postalcode = this.formGroup.value.postal_code;

    if (!province && !postalcode) {
      this.presentAlert('Provinsi dan Kodepos wajib diisi');
    } else {
      let x = await this.listingService.geocoding(
        postalcode,
        `${province} Indonesia`
      );

      if (x.length > 0) {
        let y = x[0];
        this.latitude = this.selectedLatitude ? this.selectedLatitude : y.lat;
        this.longitude = this.selectedLongitude
          ? this.selectedLongitude
          : y.lon;

        this.presentModal();
      } else {
        this.presentAlert(
          'Lokasi tidak ditemukan. Harap hubungi admin OPSIONAL.'
        );
      }
    }
  }

  dismiss() {
    this.modalController.getTop().then((v) => {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalController.dismiss({
        dismissed: true,
      });
    });
  }
}
