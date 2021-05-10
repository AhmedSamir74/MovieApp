import { SAVE_SESSION, SAVE_TOKEN } from "../../../constants";
import { _storeData } from "../../controllers/storageController";

export const saveToken = (token: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: SAVE_TOKEN,
      payload: token,
    });
  };
};

export const saveSession = (sessionId: string) => {
  return async (dispatch: any) => {
    _storeData("sessionId", sessionId);
    dispatch({
      type: SAVE_SESSION,
      payload: sessionId,
    });
  };
};
