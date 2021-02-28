type Gravatar = {
  hash: string;
};

type Avatar = {
  gravatar: Gravatar;
};

export interface Account {
  id: number;
  avatar: Avatar;
  name: string;
  username: string;
}

export interface List {
  id: number;
  name: string;
  description: string;
  poster_path: string;
  item_count: number;
  favorite_count: number;
  list_type: number;
}

export enum ProfileActions {
  SetIsFetching = 'profile/SET_IS_FETCHING',
  SetProfile = 'profile/SET_PROFILE',
  FetchListsRequest = 'profile/FETCH_LISTS_REQUEST',
  FetchListsSuccess = 'profile/FETCH_LISTS_SUCCESS',
  AddMovieToListSuccess = 'profile/ADD_MOVIE_TO_LIST_SUCCESS',
  ResetAddToMovieListSuccess = 'profile/RESET_MOVIE_TO_LIST_SUCCESS',
  AddMovieToListError = 'profile/ADD_MOVIE_TO_LIST_ERROR',
}

export interface SetProfileIsFetchingAction {
  type: ProfileActions.SetIsFetching;
  payload: boolean;
}

export interface InitialProfile {
  account: Account;
  lists: List[];
}

export interface SetProfileAction {
  type: ProfileActions.SetProfile;
  payload: InitialProfile;
}

export interface AddMovieToListSuccessAction {
  type: ProfileActions.AddMovieToListSuccess;
}

export interface ResetAddToMovieListSuccessAction {
  type: ProfileActions.ResetAddToMovieListSuccess;
}

export interface AddMovieToListError {
  type: ProfileActions.AddMovieToListError;
}

export interface FetchListsRequestAction {
  type: ProfileActions.FetchListsRequest;
}

export interface FetchListsSuccessAction {
  type: ProfileActions.FetchListsSuccess;
  payload: List[];
}

export type ProfileActionsType =
  | SetProfileAction
  | SetProfileIsFetchingAction
  | AddMovieToListSuccessAction
  | AddMovieToListError
  | FetchListsRequestAction
  | FetchListsSuccessAction
  | ResetAddToMovieListSuccessAction;
