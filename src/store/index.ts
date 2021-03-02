import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import moviesReducer from './slices/movies';
import profileReducer from './slices/profile';
import feedbackReducer from './slices/feedback';

export const STORAGE_STATE_KEY = '@MovyFlix:state';

const preloadedState = JSON.parse(localStorage.getItem(STORAGE_STATE_KEY) || '{}');

export const store = configureStore({
  preloadedState,
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    profile: profileReducer,
    feedback: feedbackReducer,
  },
});

store.subscribe(() => {
  const { auth, profile } = store.getState();

  localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify({ auth, profile }));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
