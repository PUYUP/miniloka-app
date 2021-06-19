import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { VerifycodeEffects } from './verifycode.effects';

describe('VerifycodeEffects', () => {
  let actions$: Observable<any>;
  let effects: VerifycodeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VerifycodeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(VerifycodeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
