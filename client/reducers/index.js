import { combineReducers } from 'redux';
import documents from './documentReducers';
import auth from './authReducers';
import apiCall from './apiCall';

const rootReducer = combineReducers({
  documents,
  auth,
  apiCall
});

export default rootReducer;
