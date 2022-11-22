import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { MoviesActionTypes } from './movies.types';

export const UpsertManyMovies = createAction(
  MoviesActionTypes.UPSERT_MANY,
  props<{ payload: Movie[] }>()
);
