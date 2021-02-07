export enum AuthActions {
  SignIn = 'SIGN_IN',
  SignOut = 'SIGN_OUT',
  SetIsFetching = 'SET_IS_FETCHING',
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
