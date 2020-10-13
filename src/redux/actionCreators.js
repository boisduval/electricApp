import * as actionType from './action';

const setLanguage = (languageCode) => {
  return {
    type: actionType.USER_SET_LANGUAGE,
    payload: {
      languageCode,
    },
  };
};

export {setLanguage};
