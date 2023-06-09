import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/responses/get-account-response';
import { AuthActionTypes } from './auth.types';

export const SignInStart = createAction(
  AuthActionTypes.SIGN_IN_START,
  props<{ payload: string }>()
);

export const SignInSuccess = createAction(
  AuthActionTypes.SIGN_IN_SUCCESS,
  props<{ payload: User }>()
);

export const SignInFailure = createAction(
  AuthActionTypes.SIGN_IN_FAILURE,
  props<{ payload: string }>()
);

export const LogoutStart = createAction(AuthActionTypes.LOGOUT_START);
export const LogoutSuccess = createAction(AuthActionTypes.LOGOUT_SUCCESS);
export const LogoutFailure = createAction(
  AuthActionTypes.LOGOUT_FAILURE,
  props<{ payload: string }>()
);
