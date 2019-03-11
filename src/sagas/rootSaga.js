import { takeLatest, put } from 'redux-saga/effects';

import {
  createStudent,
  fetchStudent,
  searchStudent,
  updateStudent,
  getAllStudentsAPI,
  uploadAttendanceAPI,
  uploadOptInAPI,
  markSelectedStudentsAttendanceAPI,
  markSelectedStudentsOptInOrOptOutAPI,
  updateIdCardStatusSelectedStudentsAPI,
  parentsRegistrationAPI,
} from './studentRegisterAPI';
import {
  createStudentFailedAction,
  createStudentSuccessAction,
  fetchSearchResultsFailureAction,
  fetchSearchResultsSuccessAction,
  fetchStudentFailedAction,
  fetchStudentSuccessAction,
  setNoRecordsFoundMessageAction,
  updateStudentFailedAction,
  updateStudentSuccessAction,
  getAllStudentsDataResultsSuccessAction,
  getAllStudentsDataResultsFailureAction,
  uploadAttendanceFileResultsSuccessAction,
  uploadAttendanceFileResultsFailureAction,
  uploadOptInFileResultsSuccessAction,
  uploadOptInFileResultsFailureAction,
  markSelectedStudentsAttendanceResultsSuccessAction,
  markSelectedStudentsAttendanceResultsFailureAction,
  markSelectedStudentsOptInOrOptOutResultsSuccessAction,
  markSelectedStudentsOptInOrOptOutResultsFailureAction,
  updateIdCardStatusSelectedStudentsResultsSuccessAction,
  updateIdCardStatusSelectedStudentsResultsFailureAction,
  parentsRegistrationResultsSuccessAction,
  parentsRegistrationResultsFailureAction,
} from '../actions/studentRegistrationActions';


export default function* rootSaga() {
  yield takeLatest(['CREATE_STUDENT'], createStudentSaga);
  yield takeLatest(['FETCH_STUDENT'], fetchStudentSaga);
  yield takeLatest(['UPDATE_STUDENT'], updateStudentSaga);
  yield takeLatest(['FETCH_SEARCH_RESULTS'], searchStudentSaga);
  yield takeLatest(['GET_ALL_STUDENTS'], getAllStudentsSaga);
  yield takeLatest(['UPLOAD_ATTENDANCE_FILE'], uploadAttendanceFileSaga);
  yield takeLatest(['UPLOAD_OPT_IN_FILE'], uploadOptInFileSaga);
  yield takeLatest(['MARK_SELECTED_STUDENTS_ATTENDANCE'], markSelectedStudentsAttendanceSaga);
  yield takeLatest(['MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT'], markSelectedStudentsOptInOrOptOutSaga);
  yield takeLatest(['UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS'], updateIdCardStatusSelectedStudentsSaga);
  yield takeLatest(['PARENTS_REGISTRATION'], parentsRegistrationSaga);
}

/**
 * createStudentSaga sage call when create a new student.
 * @param {Object} action
 */
export function* createStudentSaga(action) {
  const { student } = action;
  const errorMessage = 'Error creating new student.';
  try {
    const response = yield createStudent(student);
    if (response.student) {
      yield put(createStudentSuccessAction(response.student));
    } else {
      yield put(createStudentFailedAction(errorMessage));
    }
  } catch (e) {
    yield put(createStudentFailedAction(errorMessage));
    throw e;
  }
}

/**
 * fetchStudentSaga saga call when fetch particular student
 * @param {Object} action
 */
export function* fetchStudentSaga(action) {
  const { id, secretKey } = action;
  const errorMessage = 'Error fetching student details.';
  try {
    const response = yield fetchStudent(id, secretKey);
    if (response.student) {
      yield put(fetchStudentSuccessAction(response.student));
    } else {
      yield put(fetchStudentFailedAction(errorMessage));
    }
  } catch (e) {
    yield put(fetchStudentFailedAction(errorMessage));
    throw e;
  }
}

/**
 * updateStudentSaga saga call when update student.
 * @param {Object} action
 */
export function* updateStudentSaga(action) {
  const { id, secretKey, updatedStudent } = action;
  const errorMessage = 'Error updating student details.';
  try {
    const response = yield updateStudent(id, secretKey, updatedStudent);
    if (response) {
      yield put(updateStudentSuccessAction(response));
    } else {
      yield put(updateStudentFailedAction(errorMessage));
    }
  } catch (e) {
    yield put(updateStudentFailedAction(errorMessage));
    throw e;
  }
}

/**
 * searchStudentSaga saga call when search particular student with searchKey
 * @param {Object} action
 */
export function* searchStudentSaga(action) {
  const { searchKey, searchValue, adminKey } = action;
  const errorMessage = 'Error fetching student details.';
  try {
    const response = yield searchStudent(adminKey, searchKey, searchValue);
    if (response.students) {
      yield put(fetchSearchResultsSuccessAction(response.students));
    } else {
      yield put(setNoRecordsFoundMessageAction(response.message));
    }
  } catch (e) {
    yield put(fetchSearchResultsFailureAction(errorMessage));
    throw e;
  }
}

/**
 * getAllStudentsSaga saga call when fetch all student data.
 * @param {Object} action
 */
export function* getAllStudentsSaga(action) {
  const { secretKey } = action;
  const errorMessage = 'Error getting student details.';
  try {
    const response = yield getAllStudentsAPI(secretKey);
    if (response.students) {
      yield put(getAllStudentsDataResultsSuccessAction(response.students));
    } else {
      throw response;
    }
  } catch (e) {
    yield put(getAllStudentsDataResultsFailureAction(errorMessage));
  }
}

/**
 * uploadAttendanceFileSaga saga call when submit students attendance csv file.
 * @param {Object} action
 */
export function* uploadAttendanceFileSaga(action) {
  const { secretKey, attendanceFile, day } = action;
  const errorMessage = 'Error occurred while uploading attendance file.';
  try {
    const response = yield uploadAttendanceAPI(secretKey, attendanceFile, day);
    if (response.totalRecords) {
      yield put(uploadAttendanceFileResultsSuccessAction(response));
    } else {
      yield put(uploadAttendanceFileResultsFailureAction(errorMessage));
    }
  } catch (e) {
    yield put(uploadAttendanceFileResultsFailureAction(errorMessage));
  }
}

/**
 * /**
 * uploadOptInFileSaga saga call when submit students optIn csv file.
 * @param {Object} action
 */
export function* uploadOptInFileSaga(action) {
  const { secretKey, optInFile } = action;
  const errorMessage = 'Error occurred while uploading opt-in file.';
  try {
    const response = yield uploadOptInAPI(secretKey, optInFile);
    if (response.totalRecords) {
      yield put(uploadOptInFileResultsSuccessAction(response));
    } else {
      yield put(uploadOptInFileResultsFailureAction(errorMessage));
    }
  } catch (e) {
    yield put(uploadOptInFileResultsFailureAction(errorMessage));
  }
}

/**
 * markSelectedStudentsAttendanceSaga saga call when mark selected students attendance.
 * @param {Object} action
 */
export function* markSelectedStudentsAttendanceSaga(action) {
  const { secretKey, selectedStudentsId, day } = action;
  const errorMessage = 'Error getting mark selected students attendance.';
  try {
    const response = yield markSelectedStudentsAttendanceAPI(secretKey, selectedStudentsId, day);
    if (response.message === 'Updated Successfully') {
      yield put(markSelectedStudentsAttendanceResultsSuccessAction(response));
    } else {
      yield put(markSelectedStudentsAttendanceResultsFailureAction(errorMessage));
    }
  } catch (e) {
    yield put(markSelectedStudentsAttendanceResultsFailureAction(errorMessage));
  }
}

/**
 * markSelectedStudentsOptInOrOptOutSaga saga call when mark selected students optIn
 * @param {Object} action
 */
export function* markSelectedStudentsOptInOrOptOutSaga(action) {
  const { secretKey, selectedStudentsId, opt } = action;
  const errorMessage = 'Error getting mark selected students opt in or opt out.';
  try {
    const response = yield markSelectedStudentsOptInOrOptOutAPI(secretKey, selectedStudentsId, opt);
    if (response.message === 'Updated Successfully') {
      yield put(markSelectedStudentsOptInOrOptOutResultsSuccessAction(response));
    } else {
      yield put(markSelectedStudentsOptInOrOptOutResultsFailureAction(errorMessage));
    }
  } catch (e) {
    yield put(markSelectedStudentsOptInOrOptOutResultsFailureAction(errorMessage));
  }
}

/**
 * updateIdCardStatusSelectedStudentsSaga saga call when update Id card status of selected students
 * @param {Object} action
 */
export function* updateIdCardStatusSelectedStudentsSaga(action) {
  const { secretKey, selectedStudentsId, IdCardStatus } = action;
  const errorMessage = 'Error getting update Id card status of selected students.';
  try {
    const response = yield updateIdCardStatusSelectedStudentsAPI(secretKey, selectedStudentsId, IdCardStatus);
    if (response.message === 'Updated Successfully') {
      yield put(updateIdCardStatusSelectedStudentsResultsSuccessAction(response));
    } else {
      yield put(updateIdCardStatusSelectedStudentsResultsFailureAction(errorMessage));
    }
  } catch (e) {
    yield put(updateIdCardStatusSelectedStudentsResultsFailureAction(errorMessage));
  }
}

/**
 * parentsRegistrationSaga saga call when parent submit their registration form.
 * @param {Object} action
 */
export function* parentsRegistrationSaga(action) {
  const { name, members, phoneNumber } = action;
  const errorMessage = 'Error getting registration.';
  try {
    const response = yield parentsRegistrationAPI(name, members, phoneNumber);
    if (response.message === 'Registration successful') {
      yield put(parentsRegistrationResultsSuccessAction(response));
    } else {
      yield put(parentsRegistrationResultsFailureAction(errorMessage));
    }
  } catch (e) {
    yield put(parentsRegistrationResultsFailureAction(errorMessage));
  }
}
