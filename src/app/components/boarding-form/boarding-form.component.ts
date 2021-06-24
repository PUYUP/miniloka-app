import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Invoke,
  InvokeResend,
  InvokeReset,
} from 'src/app/store/actions/securecode.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectSecureCode } from 'src/app/store/selectors/securecode.selectors';

@Component({
  selector: 'app-boarding-form',
  templateUrl: './boarding-form.component.html',
  styleUrls: ['./boarding-form.component.scss'],
})
export class BoardingFormComponent implements OnInit {
  @Input('challenge') challenge: string;

  securecode$: Observable<any>;

  formGroup: any = FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.securecode$ = this.store.pipe(select(SelectSecureCode));
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit(token: string = null) {
    this.formGroup.value.challenge = this.challenge;
    this.store.dispatch(Invoke({ data: { ...this.formGroup.value } }));
  }

  resend() {
    this.store.dispatch(
      InvokeResend({ data: { ...this.formGroup.value }, isResend: true })
    );
  }

  reset() {
    this.store.dispatch(InvokeReset());
  }
}
