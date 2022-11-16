import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ListsActions } from './list-actions';
import { IMovieList } from '../interfaces/movie-list-response.interface';

export const listsFeatureKey = 'lists';

interface ListState extends EntityState<IMovieList> {}

const listsAdapter = createEntityAdapter<IMovieList>();

export interface ListsState {
  lists: ListState;
}

export const initialListsState = {
  lists: listsAdapter.getInitialState(),
};

export const listsReducer = createReducer(
  initialListsState,
  on(ListsActions.loadListSuccess, (state, action) => {
    return {
      ...state,
      lists: listsAdapter.addMany(action.lists, state.lists),
    };
  })
);
