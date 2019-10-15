import { combineReducers } from 'redux';

import appConfig from './app';
import { appReducer } from './appReducer';
import { memberRegistrationReducer } from './memberRegistrationReducer';
import { allMembersDataReducer } from './allMembersDataReducer';
import { assetFilesReducer } from './assetFilesReducer';
import { loaderReducer } from './loaderReducer';
import { parentsRegistrationReducer } from './parentsRegistrationReducer';

const rootReducer = combineReducers({
  appConfig,
  appReducer,
  memberRegistrationReducer,
  allMembersDataReducer,
  loaderReducer,
  assetFilesReducer,
  parentsRegistrationReducer,
});

export default rootReducer;
