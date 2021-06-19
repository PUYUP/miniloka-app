import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Retrieve } from 'src/app/store/actions/propose.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectPropose } from 'src/app/store/selectors/propose.selectors';

@Component({
  selector: 'app-propose-detail',
  templateUrl: './propose-detail.page.html',
  styleUrls: ['./propose-detail.page.scss'],
})
export class ProposeDetailPage implements OnInit {
  uuid: string;
  whatsapp_number: number;
  propose$: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');

    this.store.dispatch(Retrieve({ uuid: this.uuid }));
    this.propose$ = this.store.pipe(select(SelectPropose));
    this.propose$.subscribe((state: any) => {
      let whatsapp = state?.result?.listing?.contact?.whatsapp;
      if (whatsapp) {
        let x = whatsapp.split('');
        if (x[0] == 0) {
          x[0] = 62;
        }

        this.whatsapp_number = x.join('');
      }
    });
  }

  openMap(location: any) {
    let destination = location?.latitude + ',' + location?.longitude;
    window.open(
      'https://www.google.com/maps/search/?api=1&query=' + destination
    );
  }
}
