import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingInquiryPageRoutingModule } from './listing-inquiry-routing.module';

import { ListingInquiryPage } from './listing-inquiry.page';
import { InquiryListHuntComponent } from 'src/app/components/inquiry-list-hunt/inquiry-list-hunt.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingInquiryPageRoutingModule,
  ],
  declarations: [ListingInquiryPage, InquiryListHuntComponent],
  entryComponents: [InquiryListHuntComponent],
})
export class ListingInquiryPageModule {}
