import { takeLatest, put } from 'redux-saga/effects';

import {
  createStudent,
  fetchStudent,
  searchStudent,
  updateStudent,
  getAllStudentsAPI,
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

} from '../actions/studentRegistrationActions';


export default function* rootSaga () {
  yield takeLatest(['CREATE_STUDENT'], createStudentSaga);
  yield takeLatest(['FETCH_STUDENT'], fetchStudentSaga);
  yield takeLatest(['UPDATE_STUDENT'], updateStudentSaga);
  yield takeLatest(['FETCH_SEARCH_RESULTS'], searchStudentSaga);
  yield takeLatest(['GET_ALL_STUDENTS'], getAllStudentsSaga);

}

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

export function* updateStudentSaga(action) {
  const { id, secretKey,updatedStudent } = action;
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

export function* getAllStudentsSaga(action) {
  try{
    const response = yield getAllStudentsAPI(action);
    if(response.students){
      yield put(getAllStudentsDataResultsSuccessAction(response.students));
    }

  }catch (e){

  }
}