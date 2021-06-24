import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SecureCodeEffects } from './securecode.effects';

describe('SecureCodeEffects', () => {
  let actions$: Observable<any>;
  let effects: SecureCodeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureCodeEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SecureCodeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
