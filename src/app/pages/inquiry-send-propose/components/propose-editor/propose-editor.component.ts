import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Retrieve } from 'src/app/store/actions/inquiry.actions';
import { Create } from 'src/app/store/actions/propose.actions';
import { AppState } from 'src/app/store/reducers';
import {
  RetrieveInquiry,
  SelectInquiry,
} from 'src/app/store/selectors/inquiry.selectors';
import { SelectPropose } from 'src/app/store/selectors/propose.selectors';

@Component({
  selector: 'app-propose-editor',
  templateUrl: './propose-editor.component.html',
  styleUrls: ['./propose-editor.component.scss'],
})
export class ProposeEditorComponent implements OnInit {
  @Input('inquiry_uuid') inquiry_uuid: string;
  @Input('listing_uuid') listing_uuid: string;

  inquiry$: Observable<any>;
  propose$: Observable<any>;

  inquirySubscribe: any;
  inquiryItems: any;
  newestOffer: any;
  refreshEvent: any;
  autoGrow: boolean = false;

  formGroup: any = FormGroup;
  offerAll: boolean = false;
  sendOffer: boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public toastController: ToastController
  ) {
    this.propose$ = this.store.pipe(select(SelectPropose));
    this.propose$.subscribe((state: any) => {
      if (state?.status == 'loaded') {
        this.sendOffer = false;
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() {
    this.initForm();

    this.store.dispatch(Retrieve({ uuid: this.inquiry_uuid }));
    this.inquiry$ = this.store.pipe(
      select(RetrieveInquiry, { uuid: this.inquiry_uuid })
    );

    this.inquirySubscribe = this.inquiry$.subscribe((state: any) => {
      if (this.refreshEvent) this.refreshEvent.target.complete();

      if (state?.result?.uuid && state?.result?.items.length > 0) {
        this.newestOffer = state?.result?.newest_offer;
        this.inquiryItems = state?.result?.items;

        if (this.newestOffer?.uuid) {
          this.offerAll = this.newestOffer?.cost > 0;

          setTimeout(() => {
            this.formGroup.patchValue({
              cost: this.newestOffer?.cost > 0 ? this.newestOffer?.cost : '',
              description: this.newestOffer?.description,
              can_attend: this.newestOffer?.can_attend,
            });

            if (this.offerAll) {
              this.formGroup.controls['cost'].setValidators([
                Validators.required,
              ]);
            }
          });
        }

        let i = 0;
        let items = state?.result?.items;
        let newest = this.newestOffer?.items.slice(items.length);
        let items_with_newest = newest ? items.concat(newest) : items;

        for (let item of items_with_newest) {
          let offerItem = this.newestOffer?.uuid
            ? this.newestOffer?.items[i]
            : null;

          let data = {
            uuid: [offerItem?.uuid],
            label: [item?.label],
            cost: [
              offerItem ? (offerItem.cost > 0 ? offerItem.cost : '') : '', // value
              offerItem?.is_available && !this.offerAll
                ? [Validators.required]
                : [], // validator
            ],
            description: [offerItem?.description ? offerItem?.description : ''],
            is_available: [offerItem ? offerItem?.is_available : false],
            is_additional: [offerItem ? offerItem?.is_additional : false],
          };

          if (item) {
            if (!('inquiry_item' in item)) data['inquiry_item'] = item?.uuid;
          }

          let o = this.fb.group(data);
          this.offer_items().setControl(i, o);

          i++;
        }
      }
    });
  }

  ionViewDidEnter() {
    this.autoGrow = true;
  }

  availableChange(index: number) {
    let value = this.formGroup.controls['offer_items'].controls[index].value;
    let is_available = value?.is_available;

    if (is_available) {
      this.offer_items()
        .controls[index].get('cost')
        .setValidators([Validators.required]);
    } else {
      this.offer_items().controls[index]?.get('cost').clearValidators();

      // if additional item removed if not checked
      if (!value?.uuid && !value.inquiry_item)
        this.offer_items().removeAt(index);
    }

    this.offer_items().controls[index]?.get('cost').updateValueAndValidity();
  }

  initForm() {
    this.formGroup = this.fb.group({
      inquiry: [this.inquiry_uuid, [Validators.required]],
      offer_items: this.fb.array([]),
      cost: [''],
      description: [''],
      can_attend: [false],
    });
  }

  offer_items(): FormArray {
    return this.formGroup.get('offer_items') as FormArray;
  }

  offerAllChange() {
    if (this.offerAll) {
      for (let index in this.offer_items().controls) {
        this.offer_items().controls[index].get('cost').clearValidators();
        this.offer_items().controls[index].get('cost').updateValueAndValidity();
      }

      this.formGroup.controls['cost'].setValidators([Validators.required]);
    } else {
      for (let index in this.offer_items().controls) {
        this.offer_items()
          .controls[index].get('cost')
          .setValidators([Validators.required]);
        this.offer_items().controls[index].get('cost').updateValueAndValidity();
      }

      this.formGroup.controls['cost'].clearValidators();
    }

    this.formGroup.controls['cost'].updateValueAndValidity();
  }

  onSubmit(inquiry: any) {
    // insert inquiry_item
    let i = 0;
    let offer_items = this.formGroup.value.offer_items.map((item: any) => {
      let x = { ...item };

      if (this.offerAll) {
        x.cost = 0;
        x.description = '';
        x.is_available = true;
      }

      if (!item?.is_available) x.cost = 0;

      i++;
      return x;
    });

    let data = {
      listing: this.listing_uuid,
      inquiry: inquiry.uuid,
      /*coordinate: {
        latitude: 105.256,
        longitude: 1.345,
      }, */
      offer: {
        cost: !this.offerAll ? 0 : this.formGroup.value.cost,
        description: !this.offerAll ? '' : this.formGroup.value.description,
        can_attend: this.formGroup.value.can_attend,
      },
      offer_items: offer_items,
    };

    this.store.dispatch(Create({ data: data }));
  }

  changeOffer() {
    this.sendOffer = !this.sendOffer;
  }

  openMap(location: any) {
    let destination = location?.latitude + ',' + location?.longitude;
    window.open(
      'https://www.google.com/maps/search/?api=1&query=' + destination
    );
  }

  newItem(): FormGroup {
    return this.fb.group({
      uuid: [''],
      label: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      description: [''],
      is_available: [true],
      is_additional: [true],
    });
  }

  // Additional item
  addNewItem() {
    this.offer_items().push(this.newItem());
  }

  refresh(event: any) {
    this.refreshEvent = event;
    this.store.dispatch(Retrieve({ uuid: this.inquiry_uuid }));
  }

  ngOnDestroy() {
    this.inquirySubscribe.unsubscribe();
  }
}
