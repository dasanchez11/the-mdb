import * as AuthActions from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { User } from '../interfaces/responses/get-account-response';
import { AuthLocalStorageService } from '../services/auth-local-storage.service';

export interface AuthState {
  isLoading: boolean;
  currentUser: User | null;
  authErrors: string | null;
}

export const authInitialState: AuthState = {
  isLoading: false,
  currentUser: AuthLocalStorageService.getCurrentUser(),
  authErrors: null,
};

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.SignInStart, state => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.SignInSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authErrors: null,
    currentUser: action.payload,
  })),

  on(AuthActions.SignInFailure, (state, action) => ({
    ...state,
    isLoading: false,
    authErrors: action.payload,
  })),

  on(AuthActions.LogoutStart, state => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.LogoutSuccess, state => ({
    ...state,
    currentUser: null,
    isLoading: false,
  })),

  on(AuthActions.LogoutFailure, (state, action) => ({
    ...state,
    isLoading: false,
    authErrors: action.payload,
  }))
);
