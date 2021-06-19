import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InquiryEditorModalComponent } from './inquiry-editor-modal.component';

describe('InquiryEditorModalComponent', () => {
  let component: InquiryEditorModalComponent;
  let fixture: ComponentFixture<InquiryEditorModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InquiryEditorModalComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(InquiryEditorModalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
