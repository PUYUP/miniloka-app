import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Create, Update } from 'src/app/store/actions/listing.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectListing } from 'src/app/store/selectors/listing.selectors';

@Component({
  selector: 'app-listing-editor',
  templateUrl: './listing-editor.component.html',
  styleUrls: ['./listing-editor.component.scss'],
})
export class ListingEditorComponent implements OnInit {
  @Input('listing') listing: any;
  @Input('uuid') uuid: string;

  listing$: Observable<any>;
  formGroup: FormGroup;
  submitLoading: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.listing$ = this.store.pipe(select(SelectListing));
    this.listing$.subscribe((state: any) => {
      if (state?.result?.uuid) {
        this.submitLoading = false;
      }
    });
  }

  ngOnInit() {
    this.initForm();

    if (this.listing) {
      this.formGroup.patchValue({
        label: this.listing.label,
        keyword: this.listing.keyword,
        // description: this.listing.description,
        ...this.listing?.contact,
      });
    }
  }

  initForm() {
    this.formGroup = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telephone: [''],
      whatsapp: [''],
      keyword: ['', [Validators.required, Validators.minLength(3)]],
      // description: [''],
    });
  }

  onSubmit() {
    let data = {
      label: this.formGroup.value.label,
      keyword: this.formGroup.value.keyword,
      // description: this.formGroup.value.description,
      contact: {
        email: this.formGroup.value.email,
        telephone: this.formGroup.value.telephone,
        whatsapp: this.formGroup.value.whatsapp,
      },
    };

    if (this.listing) {
      this.store.dispatch(Update({ data: data, uuid: this.uuid }));
    } else {
      this.store.dispatch(Create({ data: data }));
    }

    this.submitLoading = true;
  }
}
