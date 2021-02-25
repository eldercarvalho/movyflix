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

type Gravatar = {
  hash: string;
};

type Avatar = {
  gravatar: Gravatar;
};

export interface userData {
  id: number;
  avatar: Avatar;
  name: string;
  username: string;
}

export interface Account {
  requestToken: string;
  sessionId: string;
  user: userData;
}

export interface SignInAction {
  type: AuthActions.SignIn;
  payload: Account;
}

export interface SignOutAction {
  type: AuthActions.SignOut;
}

export interface SetIsFetchingAction {
  type: AuthActions.SetIsFetching;
  payload: boolean;
}

export type AuthActionsType = SignInAction | SignOutAction | SetIsFetchingAction;
