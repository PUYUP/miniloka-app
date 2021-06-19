import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectAuth } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  auth$: Observable<any>;
  formGroup: any = FormGroup;

  constructor(public fb: FormBuilder, private store: Store<AppState>) {
    this.auth$ = this.store.pipe(select(SelectAuth));
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.store.dispatch(Login({ credential: { ...this.formGroup.value } }));
  }
}
