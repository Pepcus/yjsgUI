import { combineReducers } from 'redux';

import appConfig from './app';
import config from './config';
import { appReducer } from './appReducer';
import { theme } from './themeReducer';
import { memberRegistrationReducer } from './memberRegistrationReducer';
import { allMembersDataReducer } from './allMembersDataReducer';
import { assetFilesReducer } from './assetFilesReducer';
import { loaderReducer } from './loaderReducer';
import { parentsRegistrationReducer } from './parentsRegistrationReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  appConfig,
  theme,
  appReducer,
  config,
  memberRegistrationReducer,
  allMembersDataReducer,
  loaderReducer,
  assetFilesReducer,
  parentsRegistrationReducer,
  loginReducer,
});

export default rootReducer;
