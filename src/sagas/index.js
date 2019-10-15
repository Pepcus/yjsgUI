import { takeLatest } from 'redux-saga/effects';

import { bootstrapApplication } from './core';
import {
  createMemberSaga,
  fetchMemberSaga,
  getAllMembersSaga,
  markSelectedMembersAttendanceSaga,
  markSelectedMembersOptInOrOptOutSaga,
  parentsRegistrationSaga,
  updateIdCardStatusSelectedMembersSaga,
  updateMemberSaga,
  uploadAttendanceFileSaga,
  uploadOptInFileSaga,
} from './rootSaga';
import {
  fetchFilesConfigSaga,
  getAppConfigSaga,
  getBusCoordinatorsConfigSaga,
} from './assetFilesSaga';
import { loginAdminSaga } from './login';

const coreSagas = [
  takeLatest('BOOTSTRAP_APPLICATION', bootstrapApplication),
];

const sagas = [
  ...coreSagas,
  takeLatest(['CREATE_MEMBER'], createMemberSaga),
  takeLatest(['FETCH_MEMBER'], fetchMemberSaga),
  takeLatest(['UPDATE_MEMBER'], updateMemberSaga),
  takeLatest(['GET_ALL_MEMBERS'], getAllMembersSaga),
  takeLatest(['UPLOAD_ATTENDANCE_FILE'], uploadAttendanceFileSaga),
  takeLatest(['UPLOAD_OPT_IN_FILE'], uploadOptInFileSaga),
  takeLatest(['MARK_SELECTED_MEMBERS_ATTENDANCE'], markSelectedMembersAttendanceSaga),
  takeLatest(['MARK_SELECTED_MEMBERS_OPT_IN_OR_OPT_OUT'], markSelectedMembersOptInOrOptOutSaga),
  takeLatest(['UPDATE_ID_CARD_STATUS_OF_SELECTED_MEMBERS'], updateIdCardStatusSelectedMembersSaga),
  takeLatest(['PARENTS_REGISTRATION'], parentsRegistrationSaga),
  takeLatest(['FETCH_FILES_CONFIG_ACTION'], fetchFilesConfigSaga),
  takeLatest(['LOAD_APP_DATA_ACTION'], getAppConfigSaga),
  takeLatest(['LOAD_BUS_COORDINATORS_DATA_ACTION'], getBusCoordinatorsConfigSaga),
  takeLatest(['ADMIN_LOGIN'], loginAdminSaga),
];
export default sagas;
