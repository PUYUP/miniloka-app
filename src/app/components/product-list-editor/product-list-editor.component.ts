import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Create, Update } from 'src/app/store/actions/product.actions';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-product-list-editor',
  templateUrl: './product-list-editor.component.html',
  styleUrls: ['./product-list-editor.component.scss'],
})
export class ProductListEditorComponent implements OnInit {
  @Input('listing_uuid') listing_uuid: string;
  @Input('item') item: any;

  formGroup: FormGroup;
  autoGrow: boolean = false;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ionViewDidEnter() {
    this.autoGrow = true;
  }

  initForm() {
    this.formGroup = this.fb.group({
      label: ['', [Validators.required]],
      description: [''],
    });

    if (this.item) {
      this.formGroup.patchValue({
        label: this.item.label,
        description: this.item.description,
      });
    }
  }

  onSubmit() {
    let data = {
      listing: this.listing_uuid,
      ...this.formGroup.value,
    };

    if (this.item) {
      this.store.dispatch(Update({ data: data, uuid: this.item.uuid }));
    } else {
      this.store.dispatch(Create({ data: data }));
    }

    this.dismiss();
  }

  dismiss() {
    this.modalController
      .getTop()
      .then((v) =>
        v ? this.modalController.dismiss({ dimissed: true }) : null
      );
  }
}
