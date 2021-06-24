import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PasswordRecovery } from 'src/app/store/actions/auth.actions';
import { InvokeReset } from 'src/app/store/actions/securecode.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectSecureCode } from 'src/app/store/selectors/securecode.selectors';

@Component({
  selector: 'app-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.scss'],
})
export class SetPasswordFormComponent implements OnInit {
  showedPassword: boolean = false;
  securecode$: Observable<any>;
  securecodeSubscribe: any;
  securecode: any;

  formGroup: any = FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.securecode$ = this.store.pipe(select(SelectSecureCode));
    this.securecodeSubscribe = this.securecode$.subscribe((state: any) => {
      if (state) this.securecode = state?.result;
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      retype_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    let param = {
      ...this.formGroup.value,
      securecode_email: this.securecode?.email,
      securecode_passcode: this.securecode?.passcode,
      securecode_token: this.securecode?.token,
      password_token: this.securecode?.password_token,
      password_uidb64: this.securecode?.password_uidb64,
    };

    this.store.dispatch(PasswordRecovery({ credential: param }));
  }

  showPassword() {
    this.showedPassword = !this.showedPassword;
  }

  ngOnDestroy() {
    this.securecodeSubscribe.unsubscribe();
  }
}
