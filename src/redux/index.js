import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userSetLanguage', 'pushNotificationSettings'],
};
const myPersistReducer = persistReducer(persistConfig, reducers);
const middlewares = [thunk];
const enhancer = composeWithDevTools({
  // Options: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#options
})(applyMiddleware(...middlewares));
const store = createStore(myPersistReducer, enhancer); // 把下面的记录本内容传给store

export const persistor = persistStore(store);
export default store;
