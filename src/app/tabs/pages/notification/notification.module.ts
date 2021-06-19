import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationPage } from './notification.page';

import { NotificationPageRoutingModule } from './notification-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NotificationPageRoutingModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
