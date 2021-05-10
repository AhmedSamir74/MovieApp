import i18n from "i18n-js";
import { I18nManager } from "react-native";
import {
  _retrieveData,
  _storeData,
} from "../services/controllers/storageController";

import en from "./en";
import ar from "./ar";
i18n.fallbacks = true;
i18n.translations = { en, ar };

_retrieveData("lang").then((language) => {
  if (language === undefined) {
    _storeData("lang", "en");
    i18n.locale = "en";
    I18nManager.forceRTL(false);
  } else {
    i18n.locale = language;
  }
});

export const isRTL = I18nManager.isRTL;

export function strings(name: string, params = {}) {
  return i18n.t(name, params);
}
export default i18n;
