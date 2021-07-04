import { createAction, props } from '@ngrx/store';
import { Propose, OfferItems } from '../interfaces/propose.interfaces';

const TYPE = '[Propose]';

// CREATE
export const Create = createAction(
  `${TYPE} Create`,
  props<{ data: Propose }>()
);
export const CreateSuccess = createAction(
  `${TYPE} Create Success`,
  props<{ result: any }>()
);
export const CreateFailure = createAction(
  `${TYPE} Create Failure`,
  props<{ error: any }>()
);

// UPDATE
export const Update = createAction(
  `${TYPE} Update`,
  props<{ data: Propose; uuid: string }>()
);
export const UpdateSuccess = createAction(
  `${TYPE} Update Success`,
  props<{ result: any; uuid: string }>()
);
export const UpdateFailure = createAction(
  `${TYPE} Update Failure`,
  props<{ error: any; uuid: string }>()
);

// DELETE
export const Delete = createAction(`${TYPE} Delete`, props<{ uuid: string }>());
export const DeleteSuccess = createAction(
  `${TYPE} Delete Success`,
  props<{ uuid: string }>()
);
export const DeleteFailure = createAction(
  `${TYPE} Delete Failure`,
  props<{ error: any }>()
);

// GET
export const Get = createAction(`${TYPE} Get`);
export const GetSuccess = createAction(
  `${TYPE} Get Success`,
  props<{
    results: any;
    next?: string;
    previous?: string;
    isLoadMore?: boolean;
  }>()
);
export const GetLoadMore = createAction(
  `${TYPE} Get Load More`,
  props<{ next?: string; previous?: string; isLoadMore?: boolean }>()
);
export const GetOfferPropose = createAction(
  `${TYPE} Get Offer Propose `,
  props<{ inquiry_uuid: string }>()
);

// RETRIEVE
export const Retrieve = createAction(
  `${TYPE} Retrieve`,
  props<{ uuid: string; is_refresh?: boolean }>()
);
export const RetrieveSuccess = createAction(
  `${TYPE} Retrieve Success`,
  props<{ result: any }>()
);
