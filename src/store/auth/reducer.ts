import { AuthActionsType, AuthActions } from './actionsTypes';

export interface AuthState {
  sessionId: string;
  isUserLoggedIn: boolean;
  isFetching: boolean;
}

const initialState = {
  sessionId: '',
  isUserLoggedIn: false,
  isFetching: false,
};

export const authReducer = (state = initialState, action: AuthActionsType): AuthState => {
  switch (action.type) {
    case AuthActions.SignIn:
      return {
        ...state,
        sessionId: action.payload,
        isUserLoggedIn: true,
        isFetching: false,
      };
    case AuthActions.SignOut:
      return { ...state, sessionId: '', isUserLoggedIn: false };
    case AuthActions.SetIsFetching:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};
