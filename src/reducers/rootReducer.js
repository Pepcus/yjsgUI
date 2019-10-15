import { combineReducers } from 'redux';

import { appReducer } from './appReducer';
import { memberRegistrationReducer } from './memberRegistrationReducer';
import { allMembersDataReducer } from './allMembersDataReducer';
import { assetFilesReducer } from './assetFilesReducer';
import { loaderReducer } from './loaderReducer';
import { parentsRegistrationReducer } from './parentsRegistrationReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
  appReducer,
  memberRegistrationReducer,
  allMembersDataReducer,
  loaderReducer,
  assetFilesReducer,
  parentsRegistrationReducer,
  loginReducer,
});

export default rootReducer;
