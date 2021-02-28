import { ProfileActions, ProfileActionsType, Account, List } from './actionsTypes';

export interface ProfileState {
  isFetching: boolean;
  account: Account | null;
  lists: List[];
  success: boolean;
  error: boolean;
}

const initialState = {
  isFetching: false,
  account: null,
  lists: [],
  success: false,
  error: false,
};

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType,
): ProfileState => {
  switch (action.type) {
    case ProfileActions.SetProfile:
      return {
        ...state,
        account: action.payload.account,
        lists: action.payload.lists,
      };
    case ProfileActions.SetIsFetching:
      return { ...state, isFetching: action.payload, error: false, success: false };
    case ProfileActions.AddMovieToListSuccess:
      return { ...state, error: false, success: true };
    case ProfileActions.AddMovieToListError:
      return { ...state, error: true, success: false };
    case ProfileActions.FetchListsRequest:
      return { ...state, isFetching: true };
    case ProfileActions.ResetAddToMovieListSuccess:
      return { ...state, success: false };
    case ProfileActions.FetchListsSuccess:
      return {
        ...state,
        lists: action.payload,
        isFetching: false,
        success: false,
      };
    default:
      return state;
  }
};
