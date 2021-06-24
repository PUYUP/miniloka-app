import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Register } from 'src/app/store/actions/auth.actions';
import { InvokeReset } from 'src/app/store/actions/securecode.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectAuth } from 'src/app/store/selectors/auth.selectors';
import { SelectSecureCodeValidate } from 'src/app/store/selectors/securecode.selectors';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  securecodeValidate$: Observable<any>;
  auth$: Observable<any>;

  formGroup: any = FormGroup;
  challenge: string;
  token: string;
  passcode: string;
  showedPassword: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    // Validate
    this.securecodeValidate$ = this.store.pipe(
      select(SelectSecureCodeValidate)
    );
    this.securecodeValidate$.subscribe((payload: any) => {
      this.initForm();

      if (payload.result?.token) {
        this.formGroup.patchValue({
          email: payload.result?.email,
        });

        this.challenge = payload.result?.challenge;
        this.token = payload.result?.token;
        this.passcode = payload.result?.passcode;
      }
    });

    this.auth$ = this.store.pipe(select(SelectAuth));
  }

  ngOnInit() {}

  initForm() {
    this.formGroup = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    let verification = {
      passcode: this.passcode,
      challenge: this.challenge,
      token: this.token,
    };

    this.store.dispatch(
      Register({
        credential: { ...this.formGroup.value, verification: verification },
      })
    );
  }

  showPassword() {
    this.showedPassword = !this.showedPassword;
  }

  reset() {
    this.store.dispatch(InvokeReset());
    this.formGroup.reset();
  }
}
