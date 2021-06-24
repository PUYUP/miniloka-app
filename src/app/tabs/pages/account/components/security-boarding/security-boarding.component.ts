import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectSecureCode } from 'src/app/store/selectors/securecode.selectors';

@Component({
  selector: 'app-security-boarding',
  templateUrl: './security-boarding.component.html',
  styleUrls: ['./security-boarding.component.scss'],
})
export class SecurityBoardingComponent implements OnInit {
  @Input('data') data: any;

  securecode$: Observable<any>;
  action: string = 'change';

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.securecode$ = this.store.pipe(select(SelectSecureCode));
  }

  ngOnInit() {
    console.log(this.data);
  }

  dismiss() {
    if (this.modalController.getTop()) {
      this.modalController.dismiss({
        dismissed: true,
      });
    }
  }
}
