import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { InquiryEditorModalComponent } from 'src/app/components/inquiry-editor-modal/inquiry-editor-modal.component';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { InquiryListComponent } from 'src/app/components/inquiry-list/inquiry-list.component';
import { ListingListComponent } from 'src/app/components/listing-list/listing-list.component';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { SelectInquiries } from 'src/app/store/selectors/inquiry.selectors';
import { SelectListings } from 'src/app/store/selectors/listing.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(InquiryListComponent) inquiryListComponent: InquiryListComponent;
  @ViewChild(ListingListComponent) listingListComponent: ListingListComponent;

  inquiries$: Observable<any>;
  listings$: Observable<any>;

  actionSheetIsOpen: boolean = false;

  mode = { icon: 'accessibility-outline', value: 'customer' };
  refreshEvent: any;
  locationCoords: any = {
    latitude: 0,
    longitude: 0,
  };

  constructor(
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private store: Store<AppState>
  ) {
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      // Hide modal
      this.modalController
        .getTop()
        .then((v) => (v ? this.modalController.dismiss() : null));

      // Hide actionSheet
      this.actionSheetController
        .getTop()
        .then((v) => (v ? this.actionSheetController.dismiss() : null));

      processNextHandler();
    });

    let accountMode = localStorage.getItem('account_mode');
    if (accountMode) {
      let accountModeJson = JSON.parse(accountMode);
      this.mode = accountModeJson;
    }

    // from inquiry list load
    this.inquiries$ = this.store.pipe(select(SelectInquiries));
    this.inquiries$.subscribe((state: any) => {
      if (this.refreshEvent) this.refreshEvent.target.complete();
    });

    // from listing list load
    this.listings$ = this.store.pipe(select(SelectListings));
    this.listings$.subscribe((state: any) => {
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
    // this.checkGPSPermission();
    this.askToTurnOnGPS();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentInquiryEditor() {
    const modal = await this.modalController.create({
      component: InquiryEditorModalComponent,
      componentProps: {
        coordinate: this.locationCoords,
      },
      backdropDismiss: false,
    });

    await modal.present().then(() => {
      this.loadingController
        .getTop()
        .then((v) => (v ? this.loadingController.dismiss() : null));
    });

    const { role } = await modal.onDidDismiss();
  }

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

    this.presentInquiryEditor();
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

        // Show editor
        this.presentInquiryEditor();
      })
      .catch((error) => {
        this.presentToast(JSON.stringify(error));
        this.loadingController.dismiss();
      });
  }
  // END

  // SELECT MODE
  async presentSelectMode() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ganti Mode',
      buttons: [
        {
          text: 'Konsumen',
          icon: 'accessibility-outline',
          handler: () => {
            this.mode = {
              icon: 'accessibility-outline',
              value: 'customer',
            };

            localStorage.setItem('account_mode', JSON.stringify(this.mode));
          },
        },
        {
          text: 'Bisnis',
          icon: 'storefront-outline',
          handler: () => {
            this.mode = {
              icon: 'storefront-outline',
              value: 'business',
            };

            localStorage.setItem('account_mode', JSON.stringify(this.mode));
          },
        },
        {
          text: 'Batal',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present().then(() => {
      this.actionSheetIsOpen = true;
    });

    const { role } = await actionSheet.onDidDismiss();
    this.actionSheetIsOpen = false;
  }

  switchMode() {
    this.presentSelectMode();
  }
  // END

  showInquiryEditor() {
    // App
    if (this.platform.is('cordova')) {
      this.presentLoading('Meminta lokasi...');
      // this.presentInquiryEditor();
      // this.checkGPSPermission();
    } else {
      this.getLocation();
    }
  }

  doRefresh(event: any) {
    this.refreshEvent = event;

    if (this.inquiryListComponent) this.inquiryListComponent.refresh();
    if (this.listingListComponent) this.listingListComponent.refresh();
  }
}
