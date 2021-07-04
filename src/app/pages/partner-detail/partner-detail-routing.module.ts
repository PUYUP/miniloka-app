import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerDetailPage } from './partner-detail.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':uuid',
        component: PartnerDetailPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerDetailPageRoutingModule {}
