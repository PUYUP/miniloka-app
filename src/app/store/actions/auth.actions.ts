import { createAction, props } from '@ngrx/store';
import {
  LoginCredential,
  PasswordRecoveryCredential,
  RegisterCredential,
} from '../interfaces/auth.interfaces';

const TYPE = '[Auth]';

// LOGIN
export const Login = createAction(
  `${TYPE} Login`,
  props<{ credential: LoginCredential }>()
);

export const LoginSuccess = createAction(
  `${TYPE} Login Success`,
  props<{ result: { user: any; token: any } }>()
);

export const LoginFailure = createAction(
  `${TYPE} Login Failure`,
  props<{ error: any }>()
);

// REGISTER
export const Register = createAction(
  `${TYPE} Register`,
  props<{ credential: RegisterCredential }>()
);

export const RegisterSuccess = createAction(
  `${TYPE} Register Success`,
  props<{ result: any }>()
);

export const RegisterFailure = createAction(
  `${TYPE} Register Failure`,
  props<{ error: any }>()
);

// PASSWORD RECOVERY
export const PasswordRecovery = createAction(
  `${TYPE} Password Recovery`,
  props<{ credential: PasswordRecoveryCredential }>()
);
export const PasswordRecoverySuccess = createAction(
  `${TYPE} Password Recovery Success`
);
export const PasswordRecoveryFailure = createAction(
  `${TYPE} Password Recovery Failure`,
  props<{ error: any }>()
);
