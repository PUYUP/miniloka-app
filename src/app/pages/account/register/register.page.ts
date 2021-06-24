import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InvokeReset } from 'src/app/store/actions/securecode.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectSecureCode } from 'src/app/store/selectors/securecode.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  securecode$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.securecode$ = this.store.pipe(select(SelectSecureCode));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.store.dispatch(InvokeReset());
  }
}
