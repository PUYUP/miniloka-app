import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Create, Update } from 'src/app/store/actions/inquiry.actions';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-inquiry-editor',
  templateUrl: './inquiry-editor.component.html',
  styleUrls: ['./inquiry-editor.component.scss'],
})
export class InquiryEditorComponent implements OnInit {
  @ViewChild('myInput', { static: true }) myInput: any;

  @Input('coordinate') coordinate: any;
  @Input('instance') instance: any;

  formGroup: FormGroup;
  itemValue: string;
  itemRemoved: any = [];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      keyword: [this.instance ? this.instance?.keyword : ''],
      items: this.fb.array([], [Validators.required]),
    });

    setTimeout(() => {
      if (this.instance?.items.length > 0) {
        for (let item of this.instance?.items) {
          let o = this.fb.group({
            uuid: [item.uuid],
            label: [item.label, [Validators.required]],
          });

          this.items().push(o);
        }
      }
    }, 500);
  }

  items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  newItem(value: string): FormGroup {
    return this.fb.group({
      label: [value, [Validators.required]],
    });
  }

  addItem() {
    if (this.itemValue) this.items().push(this.newItem(this.itemValue));

    this.itemValue = null;
    this.myInput.el.childNodes[0].style.height = 'auto';
    this.myInput.el.childNodes[0].childNodes[0].style.height = 'auto';
    this.myInput.setFocus();
  }

  removeItem(i: number) {
    // removed items instance
    if (this.instance) {
      let item = this.items().value[i];
      if (item?.uuid) {
        item['is_delete'] = true;
        this.itemRemoved.push(item);
      }
    }

    this.items().removeAt(i);
  }

  myInputChange(event: any, index: any) {
    let value = event.detail.value;
    if (!value) this.removeItem(index);
  }

  // CREATE
  create() {
    const cDate = new Date();

    // Clear filled items only
    let items = this.formGroup.value['items'].filter((d: any) => d.label);

    // Insert standalone item without clicked '+'
    if (this.itemValue) {
      let x = this.newItem(this.itemValue).value;
      if (x) items.push(x);
    }

    this.formGroup.value['items'] = items;

    this.store.dispatch(
      Create({
        data: {
          ...this.formGroup.value,
          create_at: cDate,
          location: {
            latitude: this.coordinate?.latitude,
            longitude: this.coordinate?.longitude,
          },
        },
      })
    );
  }

  update() {
    // Clear filled items only
    let items = this.formGroup.value['items'].filter((d: any) => d.label);

    // Insert standalone item without clicked '+'
    if (this.itemValue) {
      let x = this.newItem(this.itemValue).value;
      if (x) items.push(x);
    }

    // Add uuid
    for (let i in items) {
      let item = this.items().value[i];

      if (item?.uuid) items[i]['uuid'] = item.uuid;
    }

    // Append removed items
    if (this.itemRemoved.length > 0) {
      items = [...items, ...this.itemRemoved];
    }

    this.formGroup.value['items'] = items;

    this.store.dispatch(
      Update({
        uuid: this.instance?.uuid,
        data: {
          ...this.formGroup.value,
        },
      })
    );
  }

  onSubmit() {
    if (this.instance?.uuid) {
      this.update();
    } else {
      this.create();
    }
  }
}
