import { ActionReducerMap } from '@ngrx/store';
import {
  authReducer,
  AuthState,
  passwordRecoveryReducer,
  PasswordRecoveryState,
} from './auth.reducers';
import { inquiryReducer, InquiryState } from './inquiry.reducers';
import { listingReducer, ListingState } from './listing.reducers';
import { offerReducer, OfferState } from './offer.reducers';
import { personReducer, PersonState } from './person.reducers';
import { proposeReducer, ProposeState } from './propose.reducers';
import {
  verifycodeReducer,
  VerifycodeState,
  verifycodeValidateReducer,
  VerifycodeValidateState,
} from './verifycode.reducers';

// STATE
export interface AppState {
  auth: AuthState;
  verifycode: VerifycodeState;
  verifycode_validate: VerifycodeValidateState;
  password_recovery: PasswordRecoveryState;
  person: PersonState;
  inquiry: InquiryState;
  listing: ListingState;
  propose: ProposeState;
  offer: OfferState;
}

// REDUCERS
export const AppReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  verifycode: verifycodeReducer,
  verifycode_validate: verifycodeValidateReducer,
  password_recovery: passwordRecoveryReducer,
  person: personReducer,
  inquiry: inquiryReducer,
  listing: listingReducer,
  propose: proposeReducer,
  offer: offerReducer,
};
