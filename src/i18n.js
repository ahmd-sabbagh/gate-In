import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import TranslationEN from "./Translations/En/en.json";
import TranslationAR from "./Translations/Ar/ar.json";

const resources = {
  en: {
    translation: TranslationEN,
  },
  ar: {
    translation: TranslationAR,
  },
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: window.localStorage.i18nextLng ?? "ar",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
