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
  inquirySubscribe: any;
  inquiryItems: any;
  newestOffer: any;

  formGroup: any = FormGroup;
  offerAll: boolean = false;
  sendOffer: boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public toastController: ToastController
  ) {}

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
      if (state?.result?.uuid && state?.result?.items.length > 0) {
        this.newestOffer = state?.result?.newest_offer;
        this.inquiryItems = state?.result?.items;

        if (this.newestOffer?.uuid) {
          this.offerAll = this.newestOffer?.cost > 0;

          setTimeout(() => {
            this.formGroup.patchValue({
              cost: this.newestOffer?.cost > 0 ? this.newestOffer?.cost : '',
              description: this.newestOffer?.description,
            });
          });
        }

        let i = 0;

        for (let item of state?.result?.items) {
          let offerItem = this.newestOffer?.uuid
            ? this.newestOffer?.items[i]
            : null;

          let o = this.fb.group({
            inquiry_item: [item?.uuid],
            cost: [
              offerItem ? (offerItem.cost > 0 ? offerItem.cost : '') : '',
              [Validators.required],
            ],
            description: [offerItem ? offerItem.description : ''],
          });

          let index = this.offer_items().value.findIndex(
            (d: any) => d.inquiry_item == item.uuid
          );

          if (index == -1) this.offer_items().push(o);
          i++;
        }
      }
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      inquiry: [this.inquiry_uuid, [Validators.required]],
      offer_items: this.fb.array([]),
      cost: [''],
      description: [''],
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
      }

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
      },
      offer_items: offer_items,
    };

    this.store.dispatch(Create({ data: data }));
    this.sendOffer = false;
  }

  changeOffer() {
    this.sendOffer = !this.sendOffer;
  }

  ngOnDestroy() {
    this.inquirySubscribe.unsubscribe();
  }
}
