import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/store/auth.reducer';
import { HomeState, homReducer } from './home/store/home/home.reducer';

export interface AppState {
  auth: AuthState;
  home: HomeState;
}

export const storeReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  home: homReducer,
};
