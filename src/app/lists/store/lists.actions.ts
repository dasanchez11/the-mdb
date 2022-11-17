import { createAction, props } from '@ngrx/store';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { ListsActionsTypes } from './lists.types';

export const loadLists = createAction(ListsActionsTypes.LOAD_LISTS);

export const loadListSuccess = createAction(
  ListsActionsTypes.LOAD_LISTS_SUCCESS,
  props<{ lists: IListDetails[] }>()
);

export const loadListFailure = createAction(
  ListsActionsTypes.LOAD_LISTS_FAILURE
);

export const deleteMovieFromList = createAction(
  ListsActionsTypes.DELETE_MOVIE_FROM_LIST,
  props<{ listId: number; movieId: number }>()
);

export const updateLists = createAction(
  ListsActionsTypes.UPDATE_LIST,
  props<{ list: IListDetails }>()
);

export const loadListDetails = createAction(
  ListsActionsTypes.LOAD_LIST_DETAILS,
  props<{ listId : number}>()
)

export const loadListDetailsSucess = createAction(
  ListsActionsTypes.LOAD_LIST_DETAILS_SUCCESS,
  props<{listDetails : IListDetails}>()
)

