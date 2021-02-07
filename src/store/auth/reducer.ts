import { AuthActionsType, AuthActions } from './actionsTypes';

export interface AuthState {
  request_token: string;
  isFetching: boolean;
}

const initialState = {
  request_token: '',
  isFetching: false,
};

export const authReducer = (state = initialState, action: AuthActionsType): AuthState => {
  switch (action.type) {
    case AuthActions.SignIn:
      return { ...state, request_token: action.payload, isFetching: false };
    case AuthActions.SignOut:
      return { ...state, request_token: '' };
    case AuthActions.SetIsFetching:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};
