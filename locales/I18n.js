// import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';
import en from './en';
import zh from './zh';

// const locales = RNLocalize.getLocales();
// const systemLanguage = locales[0]?.languageCode; // 用户系统偏好语言

// if (systemLanguage) {
//   I18n.locale = systemLanguage;
// } else {
//   I18n.locale = 'en'; // 默认语言为英文
// }
I18n.defaultLocale = 'zh';
I18n.fallbacks = true;

I18n.translations = {
  en,
  zh,
};

export default I18n;
