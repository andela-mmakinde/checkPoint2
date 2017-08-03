import { combineReducers } from 'redux';
import documents from './documentReducers';
import auth from './authReducers';
import user from './userReducers';

const rootReducer = combineReducers({
  documents,
  auth,
  user
});
export default rootReducer;
