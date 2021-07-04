import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerPage } from './partner.page';

import { PartnerPageRoutingModule } from './partner-routing.module';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PartnerPageRoutingModule,
    SharedModule,
  ],
  declarations: [PartnerPage],
})
export class PartnerPageModule {}
