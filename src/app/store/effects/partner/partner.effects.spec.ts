import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PartnerEffects } from './partner.effects';

describe('PartnerEffects', () => {
  let actions$: Observable<any>;
  let effects: PartnerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnerEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(PartnerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
