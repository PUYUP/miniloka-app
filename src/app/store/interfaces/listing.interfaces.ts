export interface ListingLocation {
  uuid?: string;
  links?: any;
  listing: string; // uuid
  street_address: string;
  postal_code: string;
  latitude: string;
  longitude: string;
}

export interface Listing {
  uuid?: string;
  links?: any;
  label: string;
  keyword: string;
  description?: string;
  create_at?: string;
  status?: string;
  state?: any;
  location?: ListingLocation;
  listing?: string;
}
