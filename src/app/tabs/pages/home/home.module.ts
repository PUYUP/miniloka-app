import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { InquiryEditorComponent } from 'src/app/components/inquiry-editor/inquiry-editor.component';
import { InquiryEditorModalComponent } from 'src/app/components/inquiry-editor-modal/inquiry-editor-modal.component';
import { InquiryListComponent } from 'src/app/components/inquiry-list/inquiry-list.component';
import { ListingListComponent } from 'src/app/components/listing-list/listing-list.component';
import { ListingEditorModalComponent } from 'src/app/components/listing-editor-modal/listing-editor-modal.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    InquiryEditorComponent,
    InquiryEditorModalComponent,
    InquiryListComponent,
    ListingListComponent,
    ListingEditorModalComponent,
  ],
  entryComponents: [
    InquiryEditorComponent,
    InquiryEditorModalComponent,
    InquiryListComponent,
    ListingListComponent,
    ListingEditorModalComponent,
  ],
})
export class HomePageModule {}
