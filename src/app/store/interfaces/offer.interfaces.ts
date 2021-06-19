export interface OfferItem {
  propose_item: string; // uuid
  cost: number;
}

export interface Offer {
  inquiry: string; // uuid
  offers: OfferItem[];
  offer_cost?: number;
}
