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
  userId: '',
  vehicleId: '',
  batteryId: '',
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
    case actionType.CURRENT_VEHICLE:
      const {vehicleId} = payload;
      return {
        ...store,
        currentVehicle: vehicleId,
      };
    case actionType.USER_ID:
      const {AutoSystemID} = payload;
      return {
        ...store,
        userId: AutoSystemID,
      };
    case actionType.BATTERY_ID:
      const {batteryId} = payload;
      return {
        ...store,
        batteryId,
      };
    default:
      return store;
  }
};

export default publicReducer;
