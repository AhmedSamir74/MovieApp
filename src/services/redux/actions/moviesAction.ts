import { ADD_MOVIE } from '../../../constants';

export const addMovie = (
    imgPath: string,
    title: string,
    overview: string,
    date: string,
    callBack: Function
) => {
    return async (dispatch: any) => {
        dispatch({
            type: ADD_MOVIE,
            payload: {
                id: new Date().getTime,
                img: imgPath,
                title,
                overview,
                date,
            },
        });
        callBack();
    };
};
