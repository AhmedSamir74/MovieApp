import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import { authReducer, moviesReducer, favoritesReducer } from "../reducers";

const mainReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  favorites: favoritesReducer,
});

export const store = createStore(mainReducer, applyMiddleware(ReduxThunk));
