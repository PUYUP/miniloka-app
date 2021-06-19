import { AuthEffects } from './auth/auth.effects';
import { InquiryEffects } from './inquiry/inquiry.effects';
import { ListingEffects } from './listing/listing.effects';
import { OfferEffects } from './offer/offer.effects';
import { PersonEffects } from './person/person.effects';
import { ProposeEffects } from './propose/propose.effects';
import { VerifycodeEffects } from './verifycode/verifycode.effects';

export const AppEffects = [
  AuthEffects,
  VerifycodeEffects,
  PersonEffects,
  InquiryEffects,
  ListingEffects,
  ProposeEffects,
  OfferEffects,
];
