import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inquiry-send-propose',
  templateUrl: './inquiry-send-propose.page.html',
  styleUrls: ['./inquiry-send-propose.page.scss'],
})
export class InquirySendProposePage implements OnInit {
  inquiry_uuid: string;
  listing_uuid: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.inquiry_uuid =
      this.activatedRoute.snapshot.paramMap.get('inquiry_uuid');

    this.listing_uuid =
      this.activatedRoute.snapshot.paramMap.get('listing_uuid');
  }
}
