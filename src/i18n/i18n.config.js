import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './translations';

const resources = {
  en: {
    translation: en,
  },
};

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;
