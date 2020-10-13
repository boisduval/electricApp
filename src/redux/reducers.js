import * as actionType from './action';

const initialState = {
  userSetLanguage: 'zh',
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
    default:
      return store;
  }
};

export default publicReducer;
