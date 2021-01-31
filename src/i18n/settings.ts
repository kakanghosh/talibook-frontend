import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bn from './translations/bn';

i18n.use(initReactI18next).init({
  resources: {
    bn: {
      translation: bn,
    },
  },
  lng: 'bn',
  fallbackLng: 'bn',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
