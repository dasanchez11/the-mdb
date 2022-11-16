import { createAction, props } from '@ngrx/store';
import { IMovieList } from '../interfaces/movie-list-response.interface';
import { ListsActionsTypes } from './lists.types';

export const loadLists = createAction(ListsActionsTypes.LOAD_LISTS);

export const loadListSuccess = createAction(
  ListsActionsTypes.LOAD_LISTS_SUCCESS,
  props<{ lists: IMovieList[] }>()
);

export const loadListFailure = createAction(
  ListsActionsTypes.LOAD_LISTS_FAILURE
);
