import { SearchActionTypes } from './search.types';
import { createAction, props } from '@ngrx/store';
import { IMoviesReponse } from 'src/app/home/interfaces/movies-response.interface';

export const SearchStart = createAction(
  SearchActionTypes.SEARCH_START,
  props<{ payload: { page: number; query: string } }>()
);

export const SearchSuccess = createAction(
  SearchActionTypes.SEARCH_SUCCESS,
  props<{ payload: IMoviesReponse }>()
);

export const ClearSearch = createAction(SearchActionTypes.CLEAR_SEARCH);
