import { combineReducers } from 'redux';

import api from 'reducers/api';
import appConfig from './app';
import config from './config';
import { appReducer } from './appReducer';
import { constants } from './constants';
import { theme } from './themeReducer';
import { memberRegistrationReducer } from './memberRegistrationReducer';
import { coordinatorRegistrationReducer } from './coordinatorRegistrationReducer';
import { allMembersDataReducer } from './allMembersDataReducer';
import { assetFilesReducer } from './assetFilesReducer';
import { loaderReducer } from './loaderReducer';
import { parentsRegistrationReducer } from './parentsRegistrationReducer';
import { loginReducer } from './loginReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  api,
  appConfig,
  theme,
  appReducer,
  config,
  constants,
  memberRegistrationReducer,
  coordinatorRegistrationReducer,
  allMembersDataReducer,
  loaderReducer,
  assetFilesReducer,
  parentsRegistrationReducer,
  loginReducer,
  userReducer,
});

export default rootReducer;
