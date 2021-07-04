import { createAction, props } from '@ngrx/store';
import { Order } from '../interfaces/order.interfaces';

const TYPE = '[Order]';

// CREATE
export const Create = createAction(`${TYPE} Create`, props<{ data: Order }>());
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
  props<{ data: Order; uuid: string }>()
);
export const UpdateSuccess = createAction(
  `${TYPE} Update Success`,
  props<{ result: any }>()
);
export const UpdateFailure = createAction(
  `${TYPE} Update Failure`,
  props<{ error: any }>()
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
export const Get = createAction(
  `${TYPE} Get`,
  props<{ obtain?: string; keyword?: string }>()
);
export const GetSuccess = createAction(
  `${TYPE} Get Success`,
  props<{
    results?: any;
    next?: string;
    previous?: string;
    isLoadMore?: boolean;
    propose?: any;
  }>()
);
export const GetLoadMore = createAction(
  `${TYPE} Get Load More`,
  props<{ next?: string; previous?: string; isLoadMore?: boolean }>()
);

// RETRIEVE
export const Retrieve = createAction(
  `${TYPE} Retrieve`,
  props<{ uuid: string }>()
);
export const RetrieveSuccess = createAction(
  `${TYPE} Retrieve Success`,
  props<{ result?: any }>()
);
