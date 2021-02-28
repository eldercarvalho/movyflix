import { Dispatch } from 'redux';
import { http } from '../../services/http';

import { addToast, ToastData } from '../feedback';
import { ProfileActions } from '../profile';
import { AuthActions, AuthData } from './actionsTypes';

export const signIn = (authData: AuthData) => async (
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch({ type: AuthActions.SetIsFetching, payload: true });

    const validationResponse = await http.post(
      '/authentication/token/validate_with_login',
      authData,
    );

    const sessionResponse = await http.post('/authentication/session/new', {
      request_token: validationResponse.data.request_token,
    });

    const accountResponse = await http.get(
      `/account?session_id=${sessionResponse.data.session_id}`,
    );

    const listsResponse = await http.get(
      `/account/${accountResponse.data.id}/lists?session_id=${sessionResponse.data.session_id}`,
    );

    http.defaults.params.session_id = sessionResponse.data.session_id;

    dispatch({
      type: AuthActions.SignIn,
      payload: sessionResponse.data.session_id,
    });

    dispatch({
      type: ProfileActions.SetProfile,
      payload: {
        account: accountResponse.data,
        lists: listsResponse.data.results,
      },
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

export const signOut = () => (dispatch: Dispatch) => {
  delete http.defaults.params.session_id;

  dispatch({
    type: AuthActions.SignOut,
  });

  dispatch({
    type: ProfileActions.SetProfile,
    payload: {
      account: null,
      lists: [],
    },
  });
};

export const requestToken = () => async (): Promise<void> => {
  const response = await http.get('authentication/token/new');

  window.open(
    `https://www.themoviedb.org/authenticate/${response.data.request_token}?redirect_to=${process.env.REACT_APP_URL}`,
  );
};
