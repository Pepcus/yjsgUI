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
  fetchMembersByMobileNumberSaga,
} from './member';

import {
  createUserSaga,
  fetchUserFromPhoneSaga,
  editUserSaga,
  patchUserSaga,
} from './user';
import {
  createCoordinatorSaga,
  fetchCoordinatorSaga,
  updateCoordinatorSaga,
} from './coordinator';
import {
  fetchFilesConfigSaga,
} from './file';
import { loginAdminSaga } from './login';
import { updateMembersOptInStatusSaga } from 'sagas/member';
import {
  fetchCoordinatorDepartmentsSaga,
  fetchCoordinatorsSaga,
} from 'sagas/coordinator';

const coreSagas = [
  takeLatest('BOOTSTRAP_APPLICATION', bootstrapApplication),
];

const sagas = [
  ...coreSagas,
  takeLatest(['CREATE_MEMBER'], createMemberSaga),
  takeLatest(['CREATE_COORDINATOR'], createCoordinatorSaga),
  takeLatest(['FETCH_MEMBER'], fetchMemberSaga),
  takeLatest(['FETCH_COORDINATOR'], fetchCoordinatorSaga),
  takeLatest(['UPDATE_MEMBER'], updateMemberSaga),
  takeLatest(['UPDATE_COORDINATOR'], updateCoordinatorSaga),
  takeLatest(['GET_ALL_MEMBERS'], getAllMembersSaga),
  takeLatest(['UPLOAD_ATTENDANCE_FILE'], uploadAttendanceFileSaga),
  takeLatest(['UPLOAD_OPT_IN_FILE'], uploadOptInFileSaga),
  takeLatest(['MARK_SELECTED_MEMBERS_ATTENDANCE'], markSelectedMembersAttendanceSaga),
  takeLatest(['MARK_SELECTED_MEMBERS_OPT_IN_OR_OPT_OUT'], markSelectedMembersOptInOrOptOutSaga),
  takeLatest(['UPDATE_ID_CARD_STATUS_OF_SELECTED_MEMBERS'], updateIdCardStatusSelectedMembersSaga),
  takeLatest(['PARENTS_REGISTRATION'], parentsRegistrationSaga),
  takeLatest(['FETCH_FILES_CONFIG_ACTION'], fetchFilesConfigSaga),
  takeLatest(['ADMIN_LOGIN'], loginAdminSaga),
  takeLatest(['FETCH_COORDINATORS'], fetchCoordinatorsSaga),
  takeLatest(['FETCH_MEMBERS_BY_MOBILE_NUMBER'], fetchMembersByMobileNumberSaga),
  takeLatest(['FETCH_COORDINATOR_DEPARTMENTS'], fetchCoordinatorDepartmentsSaga),
  takeLatest(['UPDATE_MEMBERS_OPT_IN_STATUS'], updateMembersOptInStatusSaga),
  takeLatest(['CREATE_USER_ACTION'], createUserSaga),
  takeLatest(['UPDATE_USER_ACTION'], editUserSaga),
  takeLatest(['PATCH_USER_ACTION'], patchUserSaga),
  takeLatest(['FETCH_USER_FROM_PHONE_ACTION'], fetchUserFromPhoneSaga),
];
export default sagas;
