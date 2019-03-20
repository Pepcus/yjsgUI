import { takeLatest, put } from 'redux-saga/effects';
import csv from 'csvtojson';

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
  setLoadingStateAction,
  fetchFilesSuccessAction,
  fetchFilesFailedAction,
  fetchFileConfigSuccessAction, fetchFileConfigFailedAction,
} from '../actions/studentRegistrationActions';

import { fetchCSVFile, fetchFileConfig, fetchXLSXFile } from '../utils/http';
import { formatXlsxToJson } from '../utils/fileUtils';

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
  yield takeLatest(['FETCH_FILES_ACTION'], fetchFilesSaga);
  yield takeLatest(['FETCH_FILES_CONFIG_ACTION'], fetchFilesConfigSaga);
}

/**
 * createStudentSaga sage call when create a new student.
 * @param {Object} action
 */
export function* createStudentSaga(action) {
  const { student } = action;
  const errorMessage = 'Error creating new student.';
  try {
    yield put(setLoadingStateAction(true));
    const response = yield createStudent(student);
    if (response.student) {
      yield put(createStudentSuccessAction(response.student));
    } else {
      yield put(createStudentFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(createStudentFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield fetchStudent(id, secretKey);
    if (response.student) {
      yield put(fetchStudentSuccessAction(response.student));
    } else {
      yield put(fetchStudentFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchStudentFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

/**
 * updateStudentSaga saga call when update student.
 * @param {Object} action
 */
export function* updateStudentSaga(action) {
  const { id, secretKey, student } = action;
  const errorMessage = 'Error updating student details.';
  try {
    yield put(setLoadingStateAction(true));
    const response = yield updateStudent({ id, secretKey, student });
    if (response) {
      yield put(updateStudentSuccessAction(response));
    } else {
      yield put(updateStudentFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(updateStudentFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield searchStudent(adminKey, searchKey, searchValue);
    if (response.students) {
      yield put(fetchSearchResultsSuccessAction(response.students));
    } else {
      yield put(setNoRecordsFoundMessageAction(response.message));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchSearchResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield getAllStudentsAPI(secretKey);
    if (response.students) {
      yield put(getAllStudentsDataResultsSuccessAction(response.students));
    } else {
      throw response;
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(getAllStudentsDataResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield uploadAttendanceAPI(secretKey, attendanceFile, day);
    if (response.totalRecords) {
      yield put(uploadAttendanceFileResultsSuccessAction(response));
    } else {
      yield put(uploadAttendanceFileResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(uploadAttendanceFileResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield uploadOptInAPI(secretKey, optInFile);
    if (response.totalRecords) {
      yield put(uploadOptInFileResultsSuccessAction(response));
    } else {
      yield put(uploadOptInFileResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(uploadOptInFileResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield markSelectedStudentsAttendanceAPI(secretKey, selectedStudentsId, day);
    if (response.message === 'Updated Successfully') {
      yield put(markSelectedStudentsAttendanceResultsSuccessAction(response));
    } else {
      yield put(markSelectedStudentsAttendanceResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(markSelectedStudentsAttendanceResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield markSelectedStudentsOptInOrOptOutAPI(secretKey, selectedStudentsId, opt);
    if (response.message === 'Updated Successfully') {
      yield put(markSelectedStudentsOptInOrOptOutResultsSuccessAction(response));
    } else {
      yield put(markSelectedStudentsOptInOrOptOutResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(markSelectedStudentsOptInOrOptOutResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield updateIdCardStatusSelectedStudentsAPI(secretKey, selectedStudentsId, IdCardStatus);
    if (response.message === 'Updated Successfully') {
      yield put(updateIdCardStatusSelectedStudentsResultsSuccessAction(response));
    } else {
      yield put(updateIdCardStatusSelectedStudentsResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(updateIdCardStatusSelectedStudentsResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
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
    yield put(setLoadingStateAction(true));
    const response = yield parentsRegistrationAPI(name, members, phoneNumber);
    if (response.message === 'Registration successful') {
      yield put(parentsRegistrationResultsSuccessAction(response));
    } else {
      yield put(parentsRegistrationResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(parentsRegistrationResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * fetchFilesSaga fetch csv/excel files to show them in a tabular form.
 * @param {Object} action
 */
export function* fetchFilesSaga(action) {
  const { fileDetails } = action;
  const errorMessage = 'Unable to fetch file.';
  let fileData;
  let response;
  try {
    if (fileDetails.fileType === 'csv') {
      response = yield fetchCSVFile(fileDetails);
    } else if (fileDetails.fileType === 'xlsx') {
      response = yield fetchXLSXFile(fileDetails);
    }

    if (response) {
      if (fileDetails.fileType === 'csv') {
        fileData
          = yield new Promise((resolve) => {
            csv()
              .fromString(response)
              .then(csvRow => resolve(csvRow));
          });
      } else if (fileDetails.fileType === 'xlsx') {
        fileData = formatXlsxToJson(response);
      }
      yield put(fetchFilesSuccessAction(fileData));
    } else {
      yield put(fetchFilesFailedAction(errorMessage));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* fetchFilesConfigSaga() {
  const errorMessage = 'Unable to fetch file config.';
  try {
    const response = yield fetchFileConfig();
    if (response) {
      yield put(fetchFileConfigSuccessAction(response));
    } else {
      yield put(fetchFileConfigFailedAction(errorMessage));
    }
  } catch (e) {
    console.log(e);
  }
}
