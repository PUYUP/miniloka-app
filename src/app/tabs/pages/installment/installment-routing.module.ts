import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstallmentPage } from './installment.page';

const routes: Routes = [
  {
    path: '',
    component: InstallmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallmentPageRoutingModule {}
