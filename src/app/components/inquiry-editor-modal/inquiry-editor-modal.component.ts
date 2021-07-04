import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { SelectInquiry } from 'src/app/store/selectors/inquiry.selectors';

@Component({
  selector: 'app-inquiry-editor-modal',
  templateUrl: './inquiry-editor-modal.component.html',
  styleUrls: ['./inquiry-editor-modal.component.scss'],
})
export class InquiryEditorModalComponent implements OnInit {
  @Input('coordinate') coordinate: any;
  @Input('instance') instance: any;

  inquiry$: Observable<any>;

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>
  ) {
    this.inquiry$ = this.store.pipe(select(SelectInquiry));
    this.inquiry$.subscribe((payload: any) => {
      this.dismiss();
    });
  }

  ngOnInit() {}

  dismiss() {
    this.modalController
      .getTop()
      .then((v) =>
        v ? this.modalController.dismiss({ dimissed: true }) : null
      );
  }
}
