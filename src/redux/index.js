import {createStore} from 'redux';
import reducer from './reducers';

const store = createStore(reducer); // 把下面的记录本内容传给store

export default store;
