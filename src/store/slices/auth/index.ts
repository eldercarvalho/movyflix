import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../../services/http';
import { addToast, ToastDataPayload } from '../feedback';
import { setProfile } from '../profile';
import { AuthData } from './types';

export * from './types';

export interface AuthState {
  sessionId: string;
  isUserLoggedIn: boolean;
  isFetching: boolean;
}

const initialState: AuthState = {
  sessionId: '',
  isUserLoggedIn: false,
  isFetching: false,
};

export const signIn = createAsyncThunk(
  'auth/SIGN_IN',
  async (authData: AuthData, { dispatch, rejectWithValue }) => {
    try {
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

      const profile = {
        account: accountResponse.data,
        lists: listsResponse.data.results,
      };

      dispatch(setProfile(profile));

      return sessionResponse.data.session_id;
    } catch (err) {
      const toastData = {
        type: 'error',
        title: 'Ooops!',
        message: 'Nome de usuário ou senha inválidos',
      };

      dispatch(addToast(toastData as ToastDataPayload));

      return rejectWithValue(err.response.data);
    }
  },
);

export const requestToken = createAsyncThunk('auth/REQUEST_TOKEN', async () => {
  const response = await http.get('authentication/token/new');

  window.open(
    `https://www.themoviedb.org/authenticate/${response.data.request_token}?redirect_to=${process.env.REACT_APP_URL}`,
  );
});

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.isUserLoggedIn = false;
      state.sessionId = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isUserLoggedIn = true;
      state.sessionId = action.payload;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const { signOut } = actions;

export default reducer;
