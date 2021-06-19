import { createAction, props } from '@ngrx/store';
import {
  InvokeVerifycode,
  ValidateVerifycode,
} from '../interfaces/verifycode.interfaces';

const TYPE = '[Verifycode]';

// INVOKE
export const Invoke = createAction(
  `${TYPE} Invoke`,
  props<{ data: InvokeVerifycode; isResend?: boolean }>()
);
export const InvokeSuccess = createAction(
  `${TYPE} Invoke Success`,
  props<{ result: any }>()
);
export const InvokeFailure = createAction(
  `${TYPE} Invoke Failure`,
  props<{ error: any }>()
);
export const InvokeReset = createAction(`${TYPE} Invoke Reset`);
export const InvokeResend = createAction(
  `${TYPE} Invoke Resend`,
  props<{ data: InvokeVerifycode; isResend: boolean }>()
);

// VALIDATE
export const Validate = createAction(
  `${TYPE} Validate`,
  props<{ data: ValidateVerifycode }>()
);
export const ValidateSuccess = createAction(
  `${TYPE} Validate Success`,
  props<{ result: any }>()
);
export const ValidateFailure = createAction(
  `${TYPE} Validate Failure`,
  props<{ error: any }>()
);
