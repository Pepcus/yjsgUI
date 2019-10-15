import { put } from 'redux-saga/effects';

import { setLoadingStateAction } from 'actions/loaderActions';
import { loginAdmin } from 'apis/login/login';
import {
  loginAdminSuccessAction,
  loginAdminFailureAction,
} from 'actions/loginActions';

/**
 * parentsRegistrationSaga saga call when parent submit their registration form.
 * @param {Object} action
 */
export function* loginAdminSaga(action) {
  const { adminId, adminPassword } = action;
  const errorMessage = 'Error getting login.';
  try {
    yield put(setLoadingStateAction(true));
    const response = yield loginAdmin({ adminId, adminPassword });
    if (response === true) {
      yield put(loginAdminSuccessAction(response));
    } else {
      yield put(loginAdminFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(loginAdminFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}
