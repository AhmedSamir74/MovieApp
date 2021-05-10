import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../../../constants";
import { IMovie } from "../../../models";

export const addToFavorite = (movie: IMovie) => {
  return async (dispatch: any) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: movie,
    });
  };
};

export const removeFromFavorite = (id: number) => {
  return async (dispatch: any) => {
    dispatch({
      type: REMOVE_FROM_FAVORITES,
      payload: id,
    });
  };
};
