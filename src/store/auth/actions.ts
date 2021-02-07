import { Dispatch } from 'redux';
import { http } from '../../services/http';
import { addToast, ToastData } from '../feedback';
import { AuthActions, AuthData } from './actionsTypes';

export const signIn = (authData: AuthData) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch({ type: AuthActions.SetIsFetching, payload: true });

    const response = await http.post(
      '/authentication/token/validate_with_login',
      authData,
    );

    dispatch({
      type: AuthActions.SignIn,
      payload: response.data.request_token,
    });
  } catch (err) {
    dispatch({ type: AuthActions.SetIsFetching, payload: false });

    const toastData = {
      type: 'error',
      title: 'Ooops!',
      message: err.response.data.status_message,
    } as Omit<ToastData, 'id'>;

    dispatch(addToast(toastData));
  }
};

export const signOut = () => {
  return {
    type: AuthActions.SignOut,
  };
};

export const requestToken = () => async (): Promise<void> => {
  const response = await http.get('authentication/token/new');

  window.open(
    `https://www.themoviedb.org/authenticate/${response.data.request_token}?redirect_to=${process.env.REACT_APP_URL}`,
  );
};
