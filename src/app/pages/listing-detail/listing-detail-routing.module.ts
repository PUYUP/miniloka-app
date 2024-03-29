import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListingDetailPage } from './listing-detail.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':uuid',
        component: ListingDetailPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingDetailPageRoutingModule {}
