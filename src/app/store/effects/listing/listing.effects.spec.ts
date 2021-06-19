import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ListingEffects } from './listing.effects';

describe('ListingEffects', () => {
  let actions$: Observable<any>;
  let effects: ListingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListingEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ListingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
