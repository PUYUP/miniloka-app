export interface OfferItem {
  inquiry_item: string; // uuid
  cost: number;
  description?: string;
  is_available?: boolean;
}

export interface Offer {
  inquiry: string; // uuid
  offer_items: OfferItem[];
  cost?: number;
  description?: string;
  can_attend?: boolean;
}
