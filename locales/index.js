// import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';
import {I18nManager} from 'react-native';
import store from '../src/redux';
import en from './en';
import zh from './zh';

I18nManager.allowRTL(false);

const state = store.getState();
if (state) {
  I18n.locale = state.userSetLanguage;
} else {
  I18n.locale = 'zh';
}

store.subscribe(() => {
  const {userSetLanguage: newUserSetLanguage} = store.getState();
  if (newUserSetLanguage) {
    I18n.locale = newUserSetLanguage;
  }
});
// const locales = RNLocalize.getLocales();
// const systemLanguage = locales[0]?.languageCode; // 用户系统偏好语言

// if (systemLanguage) {
//   I18n.locale = systemLanguage;
// } else {
//   I18n.locale = 'en'; // 默认语言为英文
// }
// I18n.defaultLocale = 'zh';
I18n.fallbacks = true;

I18n.translations = {
  en,
  zh,
};

export default I18n;
