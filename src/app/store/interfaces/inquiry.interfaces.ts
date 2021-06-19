export interface InquiryItem {
  uuid?: string;
  label: string;
  description: string;
  quantity?: number;
}

export interface InquiryLocation {
  latitude: any;
  longitude: any;
}

export interface Inquiry {
  uuid?: string;
  links?: any;
  kewyword: string;
  items: InquiryItem[];
  location: InquiryLocation;
}
