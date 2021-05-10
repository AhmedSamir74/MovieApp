import { SAVE_TOKEN, SAVE_SESSION } from '../../../constants';
import { IAction } from '../../../models';

const initialState = {
    userId: null,
    token: null,
    data: null,
    session_id: null,
};

export const authReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case SAVE_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case SAVE_SESSION:
            return {
                ...state,
                session_id: action.payload,
            };

        default:
            return state;
    }
};
