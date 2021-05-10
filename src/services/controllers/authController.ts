import AsyncStorage from "@react-native-community/async-storage";
import APIKit from "../axios/axios";
export const isNewUser = async () => {
  let isNew = true;
  await AsyncStorage.getItem("isNewUser", (_err, result: any) => {
    if (result !== null) {
      isNew = false;
    }
  });
  return isNew;
};

export const setNewUser = async (isNew: boolean) => {
  AsyncStorage.setItem("isNewUser", JSON.stringify(isNew));
};

export const getNewToken = async () => {
  let { data: response, statusText } = await APIKit.get(
    `authentication/token/new`
  );

  if (response.success) {
    return {
      status: true,
      data: response.request_token,
    };
  } else {
    return { status: false, data: statusText };
  }
};

export const getNewSessionID = async (request_token: string) => {
  let { data: response, statusText } = await APIKit.post(
    `authentication/session/new`,
    {
      request_token,
    }
  );

  if (response.success) {
    return {
      status: true,
      data: response.request_token,
    };
  } else {
    return { status: false, data: statusText };
  }
};

export const createNewGuestSessionID = async () => {
  let { data: response, statusText } = await APIKit.get(
    `authentication/guest_session/new`
  );

  if (response.success) {
    return {
      status: true,
      data: response.guest_session_id,
    };
  } else {
    return { status: false, data: statusText };
  }
};
