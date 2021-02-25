import { AuthActionsType, AuthActions, Account } from './actionsTypes';

export interface AuthState {
  isUserLoggedIn: boolean;
  account: Account | null;
  isFetching: boolean;
}

const initialState = {
  isUserLoggedIn: false,
  account: null,
  isFetching: false,
};

export const authReducer = (state = initialState, action: AuthActionsType): AuthState => {
  switch (action.type) {
    case AuthActions.SignIn:
      return {
        ...state,
        account: action.payload,
        isUserLoggedIn: true,
        isFetching: false,
      };
    case AuthActions.SignOut:
      return { ...state, account: null, isUserLoggedIn: false };
    case AuthActions.SetIsFetching:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};
