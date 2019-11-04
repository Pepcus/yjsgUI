import { combineReducers } from 'redux';

import api from 'reducers/api';
import appConfig from './app';
import config from './config';
import { appReducer } from './appReducer';
import { constants } from './constants';
import { theme } from './themeReducer';
import { memberRegistrationReducer } from './memberRegistrationReducer';
import { allMembersDataReducer } from './allMembersDataReducer';
import { assetFilesReducer } from './assetFilesReducer';
import { loaderReducer } from './loaderReducer';
import { parentsRegistrationReducer } from './parentsRegistrationReducer';
import { loginReducer } from './loginReducer';
import { columnListReducer } from './columnList';
import { logoPathConfigReducer } from './logoPathConfig';
import { gridMetaDataReducer } from './gridMetaData';

const rootReducer = combineReducers({
  api,
  appConfig,
  theme,
  appReducer,
  columnListReducer,
  config,
  constants,
  gridMetaDataReducer,
  memberRegistrationReducer,
  allMembersDataReducer,
  loaderReducer,
  logoPathConfigReducer,
  assetFilesReducer,
  parentsRegistrationReducer,
  loginReducer,
});

export default rootReducer;
