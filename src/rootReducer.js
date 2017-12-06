import { combineReducers } from 'redux'
import loading from './loading/reducer';
import header from './header/reducer';
import home from './home/reducer';
import global from './global/reducer';
import api from './api/reducer';

const rootReducer = combineReducers({
  loading, header, home, global, api
});

export default rootReducer