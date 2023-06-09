import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IListDetails } from '../interfaces/list-details-response.interface';
import { ListsActions } from './list-actions';

export const listsFeatureKey = 'lists';

export interface ListsState extends EntityState<IListDetails> {
  loaded: boolean;
  selectListId: number | undefined;
}
const listsAdapter = createEntityAdapter<IListDetails>();

export const initialListsState: ListsState = listsAdapter.getInitialState({
  loaded: false,
  selectListId: undefined,
});

export const listsReducer = createReducer(
  initialListsState,
  on(ListsActions.loadListSuccess, (state, action) =>
    listsAdapter.addMany(action.lists, state)
  ),
  on(ListsActions.loadListSuccess, (state): ListsState => {
    return {
      ...state,
      loaded: true,
    };
  }),
  on(ListsActions.upsertList, (state, action) =>
    listsAdapter.upsertOne(action.list, state)
  ),
  on(ListsActions.loadListDetails, (state, action): ListsState => {
    return {
      ...state,
      selectListId: action.listId,
    };
  }),
  on(ListsActions.loadListDetailsSucess, (state, action) =>
    listsAdapter.upsertOne(action.listDetails, state)
  ),
  on(ListsActions.deleteMovieFromListSucess, (state, action): ListsState => {
    const updatedList: IListDetails = {
      ...state.entities[action.listId],
      items: state.entities[action.listId]!.items.filter(
        items => items.id !== action.movieId
      ),
      item_count: state.entities[action.listId]?.item_count! - 1,
    };
    return listsAdapter.updateOne(
      { id: updatedList.id!, changes: updatedList },
      state
    );
  }),
  on(ListsActions.clearListSuccess, (state, action) =>
    listsAdapter.updateOne(
      {
        id: state.selectListId!,
        changes: {
          ...state.entities[state.selectListId!],
          items: [],
        },
      },
      state
    )
  )
);

export const selectListsState = (state: ListsState) => state;
export const { selectAll: selectAllLists } = listsAdapter.getSelectors();
