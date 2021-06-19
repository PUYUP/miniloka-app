import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProposeDetailPageRoutingModule } from './propose-detail-routing.module';

import { ProposeDetailPage } from './propose-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProposeDetailPageRoutingModule
  ],
  declarations: [ProposeDetailPage]
})
export class ProposeDetailPageModule {}
