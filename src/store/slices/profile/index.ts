import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { http } from '../../../services/http';
import { List, Account } from './types';
import { store } from '../..';
import { PaginableResult } from '../../types';
import { addToast, ToastDataPayload } from '../feedback';
import { setMovieFavorite } from '../movies';

export * from './types';

export interface ProfileState {
  isFetching: boolean;
  account: Account | null;
  lists: List[];
  success: boolean;
  error: boolean;
}

const initialState: ProfileState = {
  isFetching: false,
  account: null,
  lists: [],
  success: false,
  error: false,
};

type AddMovieToListArgs = {
  movieId: number;
  listId: number;
};

export const addMovieToList = createAsyncThunk(
  'profile/ADD_MOVIE_TO_LIST',
  async ({ movieId, listId }: AddMovieToListArgs, { rejectWithValue, dispatch }) => {
    try {
      const { account } = store.getState().profile as ProfileState;

      await http.post(`/list/${listId}/add_item`, { media_id: movieId });

      const response = await http.get<PaginableResult<List[]>>(
        `/account/${account?.id}/lists`,
      );

      const toastData = {
        type: 'success',
        title: 'Adicionado!',
        message: 'O filme foi adicionado a lista.',
      };

      dispatch(addToast(toastData as ToastDataPayload));

      return response.data.results;
    } catch (err) {
      const toastData = {
        type: 'error',
        title: 'Ooops!',
        message: 'Este filme já foi adicionado à esta lista.',
      };

      dispatch(addToast(toastData as ToastDataPayload));

      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchLists = createAsyncThunk('profile/FETCH_LISTS', async () => {
  const { account } = store.getState().profile as ProfileState;

  const response = await http.get<PaginableResult<List[]>>(
    `/account/${account?.id}/lists`,
  );

  return response.data;
});

type AddMovieToFavoritesArgs = {
  movieId: number;
  isFavorite: boolean;
  context: string;
};

export const addMovieToFavorites = createAsyncThunk(
  'profile/ADD_TO_FAVORITES',
  async ({ movieId, isFavorite, context }: AddMovieToFavoritesArgs, { dispatch }) => {
    const { account } = store.getState().profile as ProfileState;

    await http.post(`/account/${account?.id}/favorite`, {
      media_id: movieId,
      media_type: 'movie',
      favorite: isFavorite,
    });

    dispatch(
      setMovieFavorite({
        movieId,
        isFavorite,
        context,
      }),
    );
  },
);

const { actions, reducer } = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<Pick<ProfileState, 'account' | 'lists'>>) {
      state.account = action.payload.account;
      state.lists = action.payload.lists;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMovieToList.pending, (state) => {
      state.isFetching = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(addMovieToList.fulfilled, (state, action) => {
      state.isFetching = false;
      state.success = true;
      state.lists = action.payload;
    });
    builder.addCase(addMovieToList.rejected, (state) => {
      state.isFetching = false;
      state.error = true;
    });
  },
});

export const { setProfile } = actions;

export default reducer;
