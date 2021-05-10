import { ADD_MOVIE } from '../../../constants';
import { IAction } from '../../../models';

const initialState = {
    data: [],
};

export const moviesReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ADD_MOVIE:
            return {
                data: [...state.data, action.payload],
            };

        default:
            return state;
    }
};
