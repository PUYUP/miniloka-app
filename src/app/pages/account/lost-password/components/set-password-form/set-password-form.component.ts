import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PasswordRecovery } from 'src/app/store/actions/auth.actions';
import { InvokeReset } from 'src/app/store/actions/verifycode.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectVerifycode } from 'src/app/store/selectors/verifycode.selectors';

@Component({
  selector: 'app-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.scss'],
})
export class SetPasswordFormComponent implements OnInit {
  showedPassword: boolean = false;
  verifycode$: Observable<any>;
  verifycodeSubscribe: any;
  verifycode: any;

  formGroup: any = FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.verifycode$ = this.store.pipe(select(SelectVerifycode));
    this.verifycodeSubscribe = this.verifycode$.subscribe((state: any) => {
      if (state) this.verifycode = state?.result;
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
      verifycode_email: this.verifycode?.email,
      verifycode_passcode: this.verifycode?.passcode,
      verifycode_token: this.verifycode?.token,
      password_token: this.verifycode?.password_token,
      password_uidb64: this.verifycode?.password_uidb64,
    };

    this.store.dispatch(PasswordRecovery({ credential: param }));
  }

  showPassword() {
    this.showedPassword = !this.showedPassword;
  }

  ngOnDestroy() {
    this.verifycodeSubscribe.unsubscribe();
  }
}
