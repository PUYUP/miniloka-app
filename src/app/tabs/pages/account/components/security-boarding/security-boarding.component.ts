import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectVerifycode } from 'src/app/store/selectors/verifycode.selectors';

@Component({
  selector: 'app-security-boarding',
  templateUrl: './security-boarding.component.html',
  styleUrls: ['./security-boarding.component.scss'],
})
export class SecurityBoardingComponent implements OnInit {
  @Input('data') data: any;

  verifycode$: Observable<any>;
  action: string = 'change';

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.verifycode$ = this.store.pipe(select(SelectVerifycode));
  }

  ngOnInit() {
    console.log(this.data);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
