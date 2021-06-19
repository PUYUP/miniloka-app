import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostPasswordPageRoutingModule } from './lost-password-routing.module';

import { LostPasswordPage } from './lost-password.page';
import { SharedModule } from 'src/app/shared.module';
import { SetPasswordFormComponent } from './components/set-password-form/set-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LostPasswordPageRoutingModule,
    SharedModule
  ],
  declarations: [LostPasswordPage, SetPasswordFormComponent]
})
export class LostPasswordPageModule {}
