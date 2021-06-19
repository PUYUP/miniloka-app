import { createAction, props } from '@ngrx/store';
import { Security } from '../interfaces/person.interfaces';

const TYPE = '[Person]';

// USER
export const GetUser = createAction(`${TYPE} Get User`);
export const GetUserSuccess = createAction(
  `${TYPE} Get User Success`,
  props<{ user: any }>()
);

// LOGOUT
export const Logout = createAction(`${TYPE} Logout`);
export const LogoutSuccess = createAction(`${TYPE} Logout Success`);

// PROFILE
export const UpdateProfile = createAction(
  `${TYPE} Update Profile`,
  props<{ profile: any }>()
);
export const UpdateProfileSuccess = createAction(
  `${TYPE} Update Profile Success`,
  props<{ profile: any }>()
);

// SECURITY
export const UpdateSecurity = createAction(
  `${TYPE} Update Security`,
  props<{ security: Security }>()
);
export const UpdateSecuritySuccess = createAction(
  `${TYPE} Update Security Success`,
  props<{ security: any }>()
);
export const UpdateSecurityFailure = createAction(
  `${TYPE} Update Security Failure`,
  props<{ error: any }>()
);
