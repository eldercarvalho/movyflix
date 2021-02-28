import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer, AuthState } from './auth/reducer';
import { profileReducer, ProfileState } from './profile/reducer';
import { moviesReducer, MoviesState } from './movies/reducer';
import { feedbackReducer, FeedbackState } from './feedback/reducer';

export * from './feedback';
export * from './movies';
export * from './auth';
export * from './profile';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const STORAGE_STATE_KEY = '@MovyFlixStore:state';

export interface Store {
  feedback: FeedbackState;
  movies: MoviesState;
  auth: AuthState;
  profile: ProfileState;
}

const reducers = combineReducers({
  feedback: feedbackReducer,
  movies: moviesReducer,
  auth: authReducer,
  profile: profileReducer,
});

const persistedState = localStorage.getItem(STORAGE_STATE_KEY)
  ? JSON.parse(localStorage.getItem(STORAGE_STATE_KEY) || '')
  : {};

export const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => {
  localStorage.setItem(
    STORAGE_STATE_KEY,
    JSON.stringify({ auth: store.getState().auth, profile: store.getState().profile }),
  );
});
