import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InvokeReset } from 'src/app/store/actions/verifycode.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectVerifycode } from 'src/app/store/selectors/verifycode.selectors';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
})
export class LostPasswordPage implements OnInit {
  verifycode$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.verifycode$ = this.store.pipe(select(SelectVerifycode));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.store.dispatch(InvokeReset());
  }
}
