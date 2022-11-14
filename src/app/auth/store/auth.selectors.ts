import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { AuthState } from './auth.reducer';

export const selectAuthFeature = createFeatureSelector<AppState>('auth');

export const selectAuthState = createSelector(
  selectAuthFeature,
  (state: { auth: AuthState }) => state.auth
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser
);

export const selectCurrentUserLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectCurrentUserLogged = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.currentUser
);
