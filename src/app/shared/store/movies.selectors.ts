import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import {
  selectHomeIds,
  selectHomeSection,
} from 'src/app/home/store/home/home.selectors';
import { movieAdapter } from './movies.entity';

export const { selectIds, selectEntities, selectAll, selectTotal } =
  movieAdapter.getSelectors();

export const selectMovieState = (state: AppState) => state.movie;

export const selectMovieEntities = createSelector(
  selectMovieState,
  selectEntities
);

export const selectPopular = createSelector(
  selectMovieEntities,
  selectHomeSection('popular'),
  (movies, { ids }) => {
    console.log(movies);
    console.log(ids);
    return ids.map(id => movies[id]);
  }
);
