export interface OfferItems {
  cost: number;
}

export interface Coordinate {
  latitude: any;
  longitude: any;
}

export interface Offer {
  cost: number;
}

export interface Propose {
  inquiry: string; // uuid
  coordinate?: Coordinate;
  offer: Offer;
  offer_items: OfferItems[];
}
