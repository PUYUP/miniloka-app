import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Retrieve } from 'src/app/store/actions/partner.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectPartner } from 'src/app/store/selectors/partner.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input('listing_uuid') listing_uuid: string;

  listing$: Observable<any>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(Retrieve({ uuid: this.listing_uuid }));
    this.listing$ = this.store.pipe(select(SelectPartner));
  }

  openMap(location: any) {
    let destination = location?.latitude + ',' + location?.longitude;
    window.open(
      'https://www.google.com/maps/search/?api=1&query=' + destination
    );
  }
}
