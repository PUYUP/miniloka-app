import { Component, ViewChild } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { Get, GetLoadMore } from 'src/app/store/actions/partner.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectPartners } from 'src/app/store/selectors/partner.selectors';

@Component({
  selector: 'app-partner',
  templateUrl: 'partner.page.html',
  styleUrls: ['partner.page.scss'],
})
export class PartnerPage {
  @ViewChild(ProductListComponent) productListComponent: ProductListComponent;

  partners$: Observable<any>;
  loadMoreEvent: any;
  refreshEvent: any;
  next: string;
  previous: string;
  locationCoords: any = {
    latitude: 0,
    longitude: 0,
  };

  constructor(
    private store: Store<AppState>,
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController
  ) {
    this.partners$ = this.store.pipe(select(SelectPartners));
    this.partners$.subscribe((res) => {
      this.next = res?.next;
      this.previous = res?.previous;

      if (this.loadMoreEvent) {
        if (res?.isLoadMore) this.loadMoreEvent.target.complete();
        this.loadMoreEvent.target.disabled = !this.next ? true : false;
      }

      if (this.refreshEvent) this.refreshEvent.target.complete();
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });

    await toast.present();
  }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      backdropDismiss: false,
    });

    await loading.present().then(() => {});
    this.askToTurnOnGPS();

    const { role, data } = await loading.onDidDismiss();
  }

  loadMore(event: any) {
    this.loadMoreEvent = event;

    if (this.next) {
      this.store.dispatch(
        GetLoadMore({
          next: this.next,
          isLoadMore: true,
          coordinate: this.locationCoords,
        })
      );
    }

    this.loadMoreEvent.target.disabled = !this.next ? true : false;
  }

  doRefresh(event: any) {
    this.refreshEvent = event;
    this.store.dispatch(
      Get({ visibility: 'public', coordinate: this.locationCoords })
    );
  }

  activateLocation() {
    // App
    if (this.platform.is('cordova')) {
      this.presentLoading('Meminta lokasi...');
    } else {
      this.getLocation();
    }
  }

  //Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
      .then(
        (result) => {
          this.askToTurnOnGPS();
        },
        (err) => {
          this.presentToast(JSON.stringify(err));
          this.modalController.dismiss();
        }
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
        // this.loadingController.dismiss();
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
          )
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            (error) => {
              this.presentToast('Akses ke GPS harus diberikan');
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLocationCoordinates();
        },
        (error) => {
          this.presentToast('GPS harus diaktifkan');
          this.loadingController.dismiss();
        }
      );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation
      .getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 })
      .then((resp) => {
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;

        this.store.dispatch(
          Get({ visibility: 'public', coordinate: this.locationCoords })
        );
      })
      .catch((error) => {
        this.presentToast(JSON.stringify(error));
        this.loadingController.dismiss();
      });
  }
  // END

  /**
   * GEOLOCATION
   */
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError
      );
    } else {
      this.presentToast('Geolocation is not supported by this browser.');
    }
  }

  showPosition = (position: any) => {
    this.locationCoords.latitude = position.coords.latitude;
    this.locationCoords.longitude = position.coords.longitude;

    this.store.dispatch(
      Get({ visibility: 'public', coordinate: this.locationCoords })
    );
  };

  showError = (error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.presentToast('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        this.presentToast('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        this.presentToast('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        this.presentToast('An unknown error occurred.');
        break;
    }
  };
}
