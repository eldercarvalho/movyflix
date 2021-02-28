export enum AuthActions {
  SignIn = 'auth/SIGN_IN',
  SignOut = 'auth/SIGN_OUT',
  SetIsFetching = 'auth/SET_IS_FETCHING',
  FetchUserLists = 'auth/FETCH_USER_LISTS',
}

export interface AuthData {
  username: string;
  password: string;
  request_token: string;
}

export interface SignInAction {
  type: AuthActions.SignIn;
  payload: string;
}

export interface SignOutAction {
  type: AuthActions.SignOut;
}

export interface SetIsFetchingAction {
  type: AuthActions.SetIsFetching;
  payload: boolean;
}

export type AuthActionsType = SignInAction | SignOutAction | SetIsFetchingAction;
