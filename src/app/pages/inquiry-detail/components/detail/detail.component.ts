import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Retrieve } from 'src/app/store/actions/inquiry.actions';
import { AppState } from 'src/app/store/reducers';
import { RetrieveInquiry } from 'src/app/store/selectors/inquiry.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input('uuid') uuid: string;

  inquiry$: Observable<any>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(Retrieve({ uuid: this.uuid }));
    this.inquiry$ = this.store.pipe(
      select(RetrieveInquiry, { uuid: this.uuid })
    );
  }

  refresh() {
    this.store.dispatch(Retrieve({ uuid: this.uuid }));
  }
}
