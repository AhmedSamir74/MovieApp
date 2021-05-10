import AsyncStorage from "@react-native-community/async-storage";

export async function _storeData(
  key: string,
  value: any,
  callback: Function | null = null
) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    if (callback != null) {
      callback(true);
    }
  } catch (error) {
    if (callback != null) {
      callback(false);
    }
  }
}

export async function _retrieveData(key: null | string = null) {
  try {
    let retrievedItem: any;
    if (key == null) {
      let allKeys = await AsyncStorage.getAllKeys();
      retrievedItem = await AsyncStorage.multiGet(allKeys);
    } else {
      retrievedItem = await AsyncStorage.getItem(key);
    }
    return JSON.parse(retrievedItem);
  } catch (error) {
    console.warn("Error retieving data", key);
  }
}

export async function _removeData(callback: Function) {
  try {
    await AsyncStorage.removeItem("system_id", (res) => {
      AsyncStorage.removeItem("token", (res2) => {
        AsyncStorage.removeItem("authorized", (res3) => {
          callback(res3);
        });
      });
    });
  } catch (error) {
    callback(false);
  }
}
