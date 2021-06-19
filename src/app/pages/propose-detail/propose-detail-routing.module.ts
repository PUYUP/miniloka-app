import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposeDetailPage } from './propose-detail.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':uuid',
        component: ProposeDetailPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposeDetailPageRoutingModule {}
