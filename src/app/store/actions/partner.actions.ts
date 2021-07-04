import { createAction, props } from '@ngrx/store';
import { Partner, PartnerLocation } from '../interfaces/partner.interfaces';

const TYPE = '[Partner]';

// CREATE
export const Create = createAction(
  `${TYPE} Create`,
  props<{ data: Partner }>()
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
  props<{ data: Partner; uuid: string }>()
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
export const Delete = createAction(
  `${TYPE} Delete`,
  props<{ uuid: string; coordinate?: any }>()
);
export const DeleteSuccess = createAction(
  `${TYPE} Delete Success`,
  props<{ uuid: string }>()
);
export const DeleteFailure = createAction(
  `${TYPE} Delete Failure`,
  props<{ error: any }>()
);

// GET
export const Get = createAction(
  `${TYPE} Get`,
  props<{ visibility?: string; coordinate?: any }>()
);
export const GetSuccess = createAction(
  `${TYPE} Get Success`,
  props<{
    results: any;
    next?: string;
    previous?: string;
    isLoadMore?: boolean;
    coordinate?: any;
  }>()
);
export const GetLoadMore = createAction(
  `${TYPE} Get Load More`,
  props<{
    next?: string;
    previous?: string;
    isLoadMore?: boolean;
    coordinate?: any;
  }>()
);

// RETRIEVE
export const Retrieve = createAction(
  `${TYPE} Retrieve`,
  props<{ uuid: string }>()
);
export const RetrieveSuccess = createAction(
  `${TYPE} Retrieve Success`,
  props<{ result: any }>()
);

// LOCATION
export const UpdateLocation = createAction(
  `${TYPE} Update Location`,
  props<{ location: PartnerLocation }>()
);
export const UpdateLocationSuccess = createAction(
  `${TYPE} Update Location Success`,
  props<{ location: PartnerLocation }>()
);

// SET AS DEFAULT
export const SetDefault = createAction(
  `${TYPE} Set Default`,
  props<{ uuid: string }>()
);
export const SetDefaultSuccess = createAction(`${TYPE} Set Default Success`);
