import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../../../constants";
import { IAction, IMovie } from "../../../models";

const initialState = {
  list: [],
};

export const favoritesReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        list: [...state.list, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      let newList = state.list.filter(
        (movie: IMovie) => movie.id != action.payload
      );
      return {
        list: newList,
      };

    default:
      return state;
  }
};
