import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/store/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const storeReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
};
