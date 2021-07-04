import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  uuid: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
  }
}
