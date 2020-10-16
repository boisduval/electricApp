import * as actionType from './action';

const initialState = {
  userSetLanguage: 'zh',
  pushNotificationSettings: {
    pushNotificationOn: true,
    faultNotificationOn: true,
    securityNotificationOn: true,
    serviceNotificationOn: true,
    generalNotificationOn: true,
    processNotificationOn: true,
    feedbackNotificationOn: true,
    activityNotificationOn: true,
  },
};

const publicReducer = (store = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case actionType.USER_SET_LANGUAGE:
      const {languageCode} = payload;
      return {
        ...store,
        userSetLanguage: languageCode,
      };
    case actionType.PUSH_NOTIFICATION_SETTINGS:
      const {state, name} = payload;
      const newPushNotificationSettings = {
        ...store.pushNotificationSettings,
      };
      newPushNotificationSettings[name] = state;
      return {
        ...store,
        pushNotificationSettings: newPushNotificationSettings,
      };
    default:
      return store;
  }
};

export default publicReducer;
