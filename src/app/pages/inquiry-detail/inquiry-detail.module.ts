import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquiryDetailPageRoutingModule } from './inquiry-detail-routing.module';

import { InquiryDetailPage } from './inquiry-detail.page';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquiryDetailPageRoutingModule,
  ],
  declarations: [InquiryDetailPage, DetailComponent, OfferListComponent],
})
export class InquiryDetailPageModule {}
