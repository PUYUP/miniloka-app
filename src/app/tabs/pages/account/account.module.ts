import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountPage } from './account.page';

import { AccountPageRoutingModule } from './account-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SecurityComponent } from './components/security/security.component';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { SecurityEditorComponent } from './components/security-editor/security-editor.component';
import { SecurityBoardingComponent } from './components/security-boarding/security-boarding.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    AccountPage,
    ProfileComponent,
    ProfileEditorComponent,
    SecurityComponent,
    SecurityEditorComponent,
    SecurityBoardingComponent,
  ],
  entryComponents: [
    ProfileEditorComponent,
    SecurityEditorComponent,
    SecurityBoardingComponent,
  ],
})
export class AccountPageModule {}
