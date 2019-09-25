import { combineReducers } from 'redux';

import {
  memberRegistrationReducer,
  memberSearchReducer,
  allMembersDataReducer,
  loaderReducer,
} from './memberRegistrationReducer';
import { assetFilesReducer } from './assetFilesReducer';

const rootReducer = combineReducers({
  memberRegistrationReducer,
  memberSearchReducer,
  allMembersDataReducer,
  loaderReducer,
  assetFilesReducer,
});

export default rootReducer;
