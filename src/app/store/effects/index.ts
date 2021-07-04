import { AuthEffects } from './auth/auth.effects';
import { InquiryEffects } from './inquiry/inquiry.effects';
import { ListingEffects } from './listing/listing.effects';
import { OfferEffects } from './offer/offer.effects';
import { OrderEffects } from './order/order.effects';
import { PartnerEffects } from './partner/partner.effects';
import { PersonEffects } from './person/person.effects';
import { ProductEffects } from './product/product.effects';
import { ProposeEffects } from './propose/propose.effects';
import { SecureCodeEffects } from './securecode/securecode.effects';

export const AppEffects = [
  AuthEffects,
  SecureCodeEffects,
  PersonEffects,
  InquiryEffects,
  ListingEffects,
  ProposeEffects,
  OfferEffects,
  OrderEffects,
  ProductEffects,
  PartnerEffects,
];
