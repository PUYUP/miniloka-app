import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstallmentPageRoutingModule } from './installment-routing.module';

import { InstallmentPage } from './installment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstallmentPageRoutingModule
  ],
  declarations: [InstallmentPage]
})
export class InstallmentPageModule {}
