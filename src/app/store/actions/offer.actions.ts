import { createAction, props } from '@ngrx/store';
import { Offer, OfferItem } from '../interfaces/offer.interfaces';

const TYPE = '[Offer]';

// CREATE
export const Create = createAction(`${TYPE} Create`, props<{ data: Offer }>());
export const CreateSuccess = createAction(
  `${TYPE} Create Success`,
  props<{ result: any }>()
);
export const CreateFailure = createAction(
  `${TYPE} Create Failure`,
  props<{ error: any }>()
);

// HISTORY
export const GetHistory = createAction(
  `${TYPE} Get History`,
  props<{ inquiry_uuid: string }>()
);
export const GetHistorySuccess = createAction(
  `${TYPE} Get History Success`,
  props<{
    results?: any;
    next?: string;
    previous?: string;
    isLoadMore?: boolean;
    newest_offer?: any;
  }>()
);
export const GetHistoryLoadMore = createAction(
  `${TYPE} Get History Load More`,
  props<{ next?: string; previous?: string; isLoadMore?: boolean }>()
);
