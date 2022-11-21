export enum ListsActionsTypes {
  LOAD_LISTS = '[Lists lists-main] Load User lists',
  LOAD_LISTS_FAILURE = '[ListsEffects loadLists] Failed Loading Lists',
  LOAD_LISTS_SUCCESS = '[ListsEfects loadLists] Lists Loaded',
  DELETE_MOVIE_FROM_LIST = '[Lists movie] Delete Movie From List',
  UPDATE_LIST = '[Lists list-details] Update List',
  LOAD_LIST_DETAILS = '[Lists list-details-resolver] Load List Details',
  LOAD_LIST_DETAILS_SUCCESS = '[ListsEffects loadListDetails] List Details Loaded',
  DELETE_MOVIE_FROM_LIST_SUCCESS = '[ListsEffects deleteListItem] Item Deleted Succesfully',
  DELETE_MOVIE_FROM_LIST_FAILURE = '[ListEffects deleteListItem] Item Not Deleted',
}
