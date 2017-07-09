import { combineReducers } from 'redux';
import documents from './documentReducers';
import auth from './authReducers';
import user from './userReducers';
import apiCall from './apiCall';

const rootReducer = combineReducers({
  documents,
  auth,
  apiCall,
  user
});

export default rootReducer;
