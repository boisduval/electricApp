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

const setUserInformation = (information) => {
  return {
    type: actionType.USER_INFORMATION,
    payload: {information},
  };
};

const setCurrentVehicle = (VehicleSystemID) => {
  return {
    type: actionType.CURRENT_VEHICLE,
    payload: {VehicleSystemID},
  };
};

const setUserId = (AutoSystemID) => {
  return {
    type: actionType.USER_ID,
    payload: {AutoSystemID},
  };
};

const setBatteryId = (batteryId) => {
  return {
    type: actionType.BATTERY_ID,
    payload: {batteryId},
  };
};

export {
  setLanguage,
  setPushNotification,
  setUserInformation,
  setCurrentVehicle,
  setUserId,
  setBatteryId,
};
