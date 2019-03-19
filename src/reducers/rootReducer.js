import { combineReducers } from 'redux';

import {
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
  loaderReducer,
} from './studentRegistrationReducer';

const rootReducer = combineReducers({
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
  loaderReducer,
});

export default rootReducer;