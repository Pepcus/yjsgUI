import { combineReducers } from 'redux';

import { memberRegistrationReducer } from './memberRegistrationReducer';
import { allMembersDataReducer } from './allMembersDataReducer';
import { assetFilesReducer } from './assetFilesReducer';
import { loaderReducer } from './loaderReducer';

const rootReducer = combineReducers({
  memberRegistrationReducer,
  allMembersDataReducer,
  loaderReducer,
  assetFilesReducer,
});

export default rootReducer;
