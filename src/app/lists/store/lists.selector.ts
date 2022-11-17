import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLists from './lists.reducer';

export const selectListsState = createFeatureSelector<fromLists.ListsState>(
  fromLists.listsFeatureKey
);

export const selectAllLists = createSelector(
  selectListsState,
  fromLists.selectAllLists
);
