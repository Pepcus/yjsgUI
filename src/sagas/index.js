import { takeLatest } from 'redux-saga/effects';

import { bootstrapApplication } from './core/bootstrap';
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
} from './member';

import {
  createUserSaga,
  fetchUserFromPhoneSaga,
  editUserSaga,
  patchUserSaga,
} from './user';
import {
  fetchFilesConfigSaga,
} from './file';
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
  takeLatest(['ADMIN_LOGIN'], loginAdminSaga),
  takeLatest(['CREATE_USER_ACTION'], createUserSaga),
  takeLatest(['UPDATE_USER_ACTION'], editUserSaga),
  takeLatest(['PATCH_USER_ACTION'], patchUserSaga),
  takeLatest(['FETCH_USER_FROM_PHONE_ACTION'], fetchUserFromPhoneSaga),
];
export default sagas;
