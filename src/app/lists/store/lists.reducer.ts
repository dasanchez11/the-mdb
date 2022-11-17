import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { ListsActions } from './list-actions';

export const listsFeatureKey = 'lists';

export interface ListsState extends EntityState<IListDetails> {}
const listsAdapter = createEntityAdapter<IListDetails>();

export const initialListsState: ListsState = listsAdapter.getInitialState();

export const listsReducer = createReducer(
  initialListsState,
  on(ListsActions.loadListSuccess, (state, action) =>
    listsAdapter.addMany(action.lists, state)
  ),
  on(ListsActions.updateLists, (state, action) =>
    listsAdapter.upsertOne(action.list, state)
  )
);

export const selectListsState = (state: ListsState) => state;
export const { selectAll: selectAllLists } = listsAdapter.getSelectors();
