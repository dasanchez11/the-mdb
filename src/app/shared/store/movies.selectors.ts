import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { ISectionItems } from 'src/app/home/interfaces/section-items.interface';
import {
  selectHomeIds,
  selectHomePopular,
} from 'src/app/home/store/home/home.selectors';
import { movieAdapter } from './movies.entity';

export const { selectIds, selectEntities, selectAll, selectTotal } =
  movieAdapter.getSelectors();

export const selectMovieState = (state: AppState) => state.movie;

export const selectMovieEntities = createSelector(
  selectMovieState,
  selectEntities
);
