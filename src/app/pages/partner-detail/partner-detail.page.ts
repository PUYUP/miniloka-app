import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.page.html',
  styleUrls: ['./partner-detail.page.scss'],
})
export class PartnerDetailPage implements OnInit {
  uuid: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
  }
}
