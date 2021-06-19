import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InquiryListHuntComponent } from './inquiry-list-hunt.component';

describe('InquiryListHuntComponent', () => {
  let component: InquiryListHuntComponent;
  let fixture: ComponentFixture<InquiryListHuntComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InquiryListHuntComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(InquiryListHuntComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
