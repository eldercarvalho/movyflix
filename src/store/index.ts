import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { moviesReducer, MoviesState } from './movies/reducer';

export * from './movies';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const STORAGE_STATE_KEY = '@MovyFlixStore:state';

export interface Store {
  movies: MoviesState;
}

const persistedState = localStorage.getItem(STORAGE_STATE_KEY)
  ? JSON.parse(localStorage.getItem(STORAGE_STATE_KEY) || '')
  : {};

const reducers = combineReducers({
  movies: moviesReducer,
});

export const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => {
  localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(store.getState()));
});
