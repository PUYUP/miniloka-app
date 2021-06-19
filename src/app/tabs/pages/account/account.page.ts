import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetUser, Logout } from 'src/app/store/actions/person.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectPerson } from 'src/app/store/selectors/person.selectors';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {
  user$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(GetUser());
    this.user$ = this.store.pipe(select(SelectPerson));
  }

  logout() {
    this.store.dispatch(Logout());
  }
}
