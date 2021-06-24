import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BoardingFormComponent } from './components/boarding-form/boarding-form.component';
import { BoardingValidationFormComponent } from './components/boarding-validation-form/boarding-validation-form.component';
import { HowToInquiryComponent } from './components/how-to-inquiry/how-to-inquiry.component';
import { ListingEditorComponent } from './components/listing-editor/listing-editor.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BoardingFormComponent,
    BoardingValidationFormComponent,
    ListingEditorComponent,
    HowToInquiryComponent,
  ],
  declarations: [
    BoardingFormComponent,
    BoardingValidationFormComponent,
    ListingEditorComponent,
    HowToInquiryComponent,
  ],
  entryComponents: [
    BoardingFormComponent,
    BoardingValidationFormComponent,
    ListingEditorComponent,
    HowToInquiryComponent,
  ],
})
export class SharedModule {}
