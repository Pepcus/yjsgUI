import { combineReducers } from 'redux';

import {
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
  loaderReducer,
} from './studentRegistrationReducer';
import { assetFilesReducer } from './assetFilesReducer';
import { appConfigReducer } from './appConfigReducer';

const rootReducer = combineReducers({
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
  loaderReducer,
  assetFilesReducer,
  appConfigReducer,
});

export default rootReducer;
