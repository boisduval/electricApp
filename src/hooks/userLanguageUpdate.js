import React, {useState, useEffect} from 'react';
import store from '../redux';
import I18n from '../../locales';

const useLanguageUpdate = (funcWhenUpdate, listenParamArr = []) => {
  const [currentLanguageCode, setCurrentLanguageCode] = useState(I18n.locale);

  useEffect(() => {
    return store.subscribe(() => {
      const {userSetLanguage: newLanguageCode} = store.getState();
      if (newLanguageCode && newLanguageCode !== currentLanguageCode) {
        setCurrentLanguageCode(newLanguageCode);
        if (funcWhenUpdate) {
          funcWhenUpdate();
        }
      }
    });
  }, [currentLanguageCode, funcWhenUpdate]);

  return currentLanguageCode;
};

export default useLanguageUpdate;
