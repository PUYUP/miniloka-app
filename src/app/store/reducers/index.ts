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
  securecodeReducer,
  SecureCodeState,
  securecodeValidateReducer,
  SecureCodeValidateState,
} from './securecode.reducers';

// STATE
export interface AppState {
  auth: AuthState;
  securecode: SecureCodeState;
  securecode_validate: SecureCodeValidateState;
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
  securecode: securecodeReducer,
  securecode_validate: securecodeValidateReducer,
  password_recovery: passwordRecoveryReducer,
  person: personReducer,
  inquiry: inquiryReducer,
  listing: listingReducer,
  propose: proposeReducer,
  offer: offerReducer,
};
