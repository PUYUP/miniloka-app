import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquirySendProposePage } from './inquiry-send-propose.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':inquiry_uuid',
        component: InquirySendProposePage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquirySendProposePageRoutingModule {}
