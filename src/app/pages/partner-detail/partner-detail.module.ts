import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartnerDetailPageRoutingModule } from './partner-detail-routing.module';

import { PartnerDetailPage } from './partner-detail.page';
import { DetailComponent } from './components/detail/detail.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartnerDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [PartnerDetailPage, DetailComponent],
  entryComponents: [DetailComponent],
})
export class PartnerDetailPageModule {}
