import en from "./locale/en.json";
import fr from "./locale/fr.json";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

// the translations
const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    // lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: ".",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
