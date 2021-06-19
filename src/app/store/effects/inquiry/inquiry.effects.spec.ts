import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InquiryEffects } from './inquiry.effects';

describe('InquiryEffects', () => {
  let actions$: Observable<any>;
  let effects: InquiryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InquiryEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(InquiryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
