import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-how-to-inquiry',
  templateUrl: './how-to-inquiry.component.html',
  styleUrls: ['./how-to-inquiry.component.scss'],
})
export class HowToInquiryComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController
      .getTop()
      .then((v) =>
        v ? this.modalController.dismiss({ dimissed: true }) : null
      );
  }
}
