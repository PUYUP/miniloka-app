import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  InvokeResend,
  InvokeReset,
  Validate,
} from 'src/app/store/actions/securecode.actions';
import { AppState } from 'src/app/store/reducers';
import {
  SelectSecureCode,
  SelectSecureCodeValidate,
} from 'src/app/store/selectors/securecode.selectors';

@Component({
  selector: 'app-boarding-validation-form',
  templateUrl: './boarding-validation-form.component.html',
  styleUrls: ['./boarding-validation-form.component.scss'],
})
export class BoardingValidationFormComponent implements OnInit {
  securecode$: Observable<any>;
  securecodeValidate$: Observable<any>;

  formGroup: any = FormGroup;
  email: string;
  msisdn: string;
  field: string;
  value: string;
  challenge: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public toastController: ToastController
  ) {
    // INVOKE
    this.securecode$ = this.store.pipe(select(SelectSecureCode));
    this.securecode$.subscribe((payload: any) => {
      if (payload.result?.token) {
        this.email = payload.result?.email;
        this.msisdn = payload.result?.msisdn;
        this.challenge = payload.result?.challenge;
        this.value = this.email || this.msisdn;
        this.field = this.email ? 'email' : 'msisdn';

        // Init form first
        this.initForm();

        // Then patch value by field
        this.formGroup.patchValue({
          [this.field]: this.value,
        });
      }
    });

    // VALIDATE
    this.securecodeValidate$ = this.store.pipe(
      select(SelectSecureCodeValidate)
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() {}

  initForm() {
    this.formGroup = this.fb.group({
      [this.field]: ['', [Validators.required]],
      passcode: ['', [Validators.minLength(6), Validators.required]],
    });
  }

  onSubmit(token: string = null) {
    this.formGroup.value.challenge = this.challenge;
    this.store.dispatch(
      Validate({ data: { ...this.formGroup.value, token: token } })
    );
  }

  resend() {
    this.store.dispatch(
      InvokeResend({
        data: { email: this.email, challenge: this.challenge },
        isResend: true,
      })
    );

    this.presentToast('Berhasil dikirim ulang');
  }

  reset() {
    this.store.dispatch(InvokeReset());
    this.formGroup.reset();
  }
}
