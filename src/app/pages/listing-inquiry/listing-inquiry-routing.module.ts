import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquirySendProposePage } from '../inquiry-send-propose/inquiry-send-propose.page';

import { ListingInquiryPage } from './listing-inquiry.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':listing_uuid',
        children: [
          {
            path: '',
            component: ListingInquiryPage,
          },
          {
            path: 'propose',
            loadChildren: () =>
              import(
                '../inquiry-send-propose/inquiry-send-propose.module'
              ).then((m) => m.InquirySendProposePageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingInquiryPageRoutingModule {}
