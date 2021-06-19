import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProposeEffects } from './propose.effects';

describe('ProposeEffects', () => {
  let actions$: Observable<any>;
  let effects: ProposeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProposeEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(ProposeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
