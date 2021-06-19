import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.page.html',
  styleUrls: ['./listing-detail.page.scss'],
})
export class ListingDetailPage implements OnInit {
  uuid: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
  }
}
