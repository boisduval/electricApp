import * as actionType from './action';

const setLanguage = (languageCode) => {
  return {
    type: actionType.USER_SET_LANGUAGE,
    payload: {
      languageCode,
    },
  };
};

const setPushNotification = (state, name) => {
  return {
    type: actionType.PUSH_NOTIFICATION_SETTINGS,
    payload: {
      state,
      name,
    },
  };
};

export {setLanguage, setPushNotification};