import { takeLatest } from 'redux-saga/effects';
import {
  createStudentSaga,
  fetchStudentSaga,
  getAllStudentsSaga,
  markSelectedStudentsAttendanceSaga,
  markSelectedStudentsOptInOrOptOutSaga,
  parentsRegistrationSaga,
  searchStudentSaga,
  updateIdCardStatusSelectedStudentsSaga,
  updateStudentSaga,
  uploadAttendanceFileSaga,
  uploadOptInFileSaga,
} from './rootSaga';
import { fetchFilesConfigSaga, fetchFilesSaga, loadAppDataSaga } from './assetFilesSaga';

const sagas = [
  takeLatest(['CREATE_STUDENT'], createStudentSaga),
  takeLatest(['FETCH_STUDENT'], fetchStudentSaga),
  takeLatest(['UPDATE_STUDENT'], updateStudentSaga),
  takeLatest(['FETCH_SEARCH_RESULTS'], searchStudentSaga),
  takeLatest(['GET_ALL_STUDENTS'], getAllStudentsSaga),
  takeLatest(['UPLOAD_ATTENDANCE_FILE'], uploadAttendanceFileSaga),
  takeLatest(['UPLOAD_OPT_IN_FILE'], uploadOptInFileSaga),
  takeLatest(['MARK_SELECTED_STUDENTS_ATTENDANCE'], markSelectedStudentsAttendanceSaga),
  takeLatest(['MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT'], markSelectedStudentsOptInOrOptOutSaga),
  takeLatest(['UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS'], updateIdCardStatusSelectedStudentsSaga),
  takeLatest(['PARENTS_REGISTRATION'], parentsRegistrationSaga),
  takeLatest(['FETCH_FILE_ACTION'], fetchFilesSaga),
  takeLatest(['FETCH_FILES_CONFIG_ACTION'], fetchFilesConfigSaga),
  takeLatest(['LOADED_APP_DATA_ACTION'], loadAppDataSaga),
];
export default sagas;
