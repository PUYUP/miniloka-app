import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingDetailPageRoutingModule } from './listing-detail-routing.module';

import { ListingDetailPage } from './listing-detail.page';
import { DetailComponent } from './components/detail/detail.component';
import { DetailEditorComponent } from './components/detail-editor/detail-editor.component';
import { LocationEditorComponent } from './components/location-editor/location-editor.component';
import { ListingMapComponent } from './components/location-map/location-map.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ListingDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    ListingDetailPage,
    DetailComponent,
    DetailEditorComponent,
    LocationEditorComponent,
    ListingMapComponent,
  ],
  entryComponents: [
    DetailComponent,
    DetailEditorComponent,
    LocationEditorComponent,
    ListingMapComponent,
  ],
})
export class ListingDetailPageModule {}
