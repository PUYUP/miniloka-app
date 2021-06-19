import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquirySendProposePageRoutingModule } from './inquiry-send-propose-routing.module';

import { InquirySendProposePage } from './inquiry-send-propose.page';
import { ProposeEditorComponent } from './components/propose-editor/propose-editor.component';
import { OfferHistoryComponent } from './components/offer-history/offer-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InquirySendProposePageRoutingModule,
  ],
  declarations: [
    InquirySendProposePage,
    ProposeEditorComponent,
    OfferHistoryComponent,
  ],
  entryComponents: [ProposeEditorComponent, OfferHistoryComponent],
})
export class InquirySendProposePageModule {}
