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
  userInformation: {
    url: '',
    username: 'AF',
    signature: '洁净能源 情节世界',
    uid: '123456',
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
    case actionType.USER_INFORMATION:
      const {information} = payload;
      return {
        ...store,
        userInformation: information,
      };
    default:
      return store;
  }
};

export default publicReducer;
