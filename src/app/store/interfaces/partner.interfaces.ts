export interface PartnerLocation {
  uuid?: string;
  links?: any;
  partner: string; // uuid
  street_address: string;
  postal_code: string;
  latitude: string;
  longitude: string;
}

export interface Partner {
  uuid?: string;
  links?: any;
  label: string;
  keyword: string;
  description?: string;
  create_at?: string;
  status?: string;
  state?: any;
  location?: PartnerLocation;
  partner?: string;
}
