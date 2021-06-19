import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UpdateSecurity } from 'src/app/store/actions/person.actions';
import { Invoke, InvokeReset } from 'src/app/store/actions/verifycode.actions';
import { AppState } from 'src/app/store/reducers';
import { SelectSecurity } from 'src/app/store/selectors/person.selectors';
import { SelectVerifycode } from 'src/app/store/selectors/verifycode.selectors';
import { SecurityBoardingComponent } from '../security-boarding/security-boarding.component';

@Component({
  selector: 'app-security-editor',
  templateUrl: './security-editor.component.html',
  styleUrls: ['./security-editor.component.scss'],
})
export class SecurityEditorComponent implements OnInit {
  @Input('data') data: any;

  verifycode$: Observable<any>;
  security$: Observable<any>;

  dataCopy: any;
  param: any;
  challenge: string = 'change_';
  passcode: string;
  token: string;

  constructor(
    public modalController: ModalController,
    public store: Store<AppState>,
    private platform: Platform
  ) {
    if (this.modalController.getTop()) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.dismiss();
      });
    }

    this.verifycode$ = this.store.pipe(select(SelectVerifycode));
    this.verifycode$.subscribe((payload: any) => {
      if (payload.status == 'loaded' && payload.result?.token) {
        if (payload.result?.is_verified) {
          this.dismiss();

          // run save security
          this.passcode = payload.result?.passcode;
          this.token = payload.result?.token;
          this.challenge = payload.result?.challenge;

          this.save();
        } else {
          if (!payload?.isResend) this.presentBoarding(this.param);
        }
      }
    });

    this.security$ = this.store.pipe(select(SelectSecurity));
    this.security$.subscribe((payload: any) => {
      this.data = payload;
    });
  }

  ngOnInit() {
    // clone
    this.dataCopy = { ...this.data };
  }

  async presentBoarding(param: any) {
    const modal = await this.modalController.create({
      component: SecurityBoardingComponent,
      backdropDismiss: false,
      componentProps: {
        data: param,
      },
    });

    await modal.present();
  }

  saveChange(field: string) {
    if (field == 'username') {
      this.store.dispatch(
        UpdateSecurity({
          security: {
            [field]: this.dataCopy[field],
          },
        })
      );
    } else {
      this.param = {
        challenge:
          this.challenge.replace('msisdn', '').replace('email', '') + field,
        [field]: this.dataCopy[field],
      };

      this.store.dispatch(Invoke({ data: this.param }));
    }

    this.dismiss();
  }

  save() {
    this.store.dispatch(
      UpdateSecurity({
        security: {
          ...this.param,
          verification: {
            passcode: this.passcode,
            token: this.token,
            challenge: this.challenge,
          },
        },
      })
    );
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
