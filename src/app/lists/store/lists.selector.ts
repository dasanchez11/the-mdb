import { createFeatureSelector, createSelector, StateObservable } from '@ngrx/store';
import * as fromLists from './lists.reducer';

export const selectListsState = createFeatureSelector<fromLists.ListsState>(
  fromLists.listsFeatureKey
);

export const selectAllLists = createSelector(
  selectListsState,
  fromLists.selectAllLists
);

export const selectListItems = createSelector(
  selectListsState,
  (state) => state.entities[state.selectListId!]!
)

export const selectIsListsLoaded = createSelector(
  selectListsState,
  (state) => state.loaded
)

export const selectSelectedListId = createSelector(
  selectListsState,
  (state) => state.selectListId
)
