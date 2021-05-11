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
