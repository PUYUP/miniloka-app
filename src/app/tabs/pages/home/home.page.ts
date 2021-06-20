import { Component, ViewChild } from '@angular/core';
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
  inquiryEditorIsPresent: boolean = false;

  mode = { icon: 'bag-outline', value: 'customer' };
  locationCoords: any;
  refreshEvent: any;

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
    if (this.actionSheetController.getTop() || this.modalController.getTop()) {
      this.platform.backButton.subscribeWithPriority(
        10,
        (processNextHandler) => {
          if (this.actionSheetController.getTop()) {
            this.actionSheetController.dismiss();
          }

          if (this.modalController.getTop()) {
            this.modalController.dismiss();
          }

          processNextHandler();
        }
      );
    }

    this.locationCoords = {
      latitude: '',
      longitude: '',
      accuracy: '',
      timestamp: '',
    };

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
    this.checkGPSPermission();

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
      this.inquiryEditorIsPresent = true;
    });

    const { role } = await modal.onDidDismiss();
    this.inquiryEditorIsPresent = false;
  }

  /**
   * GEOLOCATION
   */
  //Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
      .then(
        (result) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        (err) => {
          this.presentToast(JSON.stringify(err));
          this.loadingController.dismiss();
        }
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');

        this.loadingController.dismiss();
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
          )
          .then(() => {
            // call method to turn on GPS
            this.askToTurnOnGPS();
          });
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
          this.loadingController.dismiss();
          this.presentToast('GPS harus diaktifkan');
        }
      );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.loadingController.dismiss();

    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;
        this.locationCoords.accuracy = resp.coords.accuracy;
        this.locationCoords.timestamp = resp.timestamp;

        // Show editor
        this.presentInquiryEditor();
      })
      .catch((error) => {
        this.presentToast(JSON.stringify(error));
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
          icon: 'bag-outline',
          handler: () => {
            this.mode = {
              icon: 'bag-outline',
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
    this.presentLoading('Meminta lokasi...');
    // this.presentInquiryEditor();
  }

  doRefresh(event: any) {
    this.refreshEvent = event;

    if (this.inquiryListComponent) this.inquiryListComponent.refresh();
    if (this.listingListComponent) this.listingListComponent.refresh();
  }
}
