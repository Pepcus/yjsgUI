import { put, select } from 'redux-saga/effects';

import { setLoadingStateAction } from 'actions/loaderActions';
import { getAPIConfig } from 'reducers/api';
import { getTenantName } from 'reducers/app';
import { callAPIWithConfig } from 'apis/apis';
import {
  fetchUserFromPhoneFailed,
  fetchUserFromPhoneSuccess,
  userCreateFailAction,
  userCreateSuccessAction
} from 'actions/userActions';

export function* createUserSaga(action) {
  yield put(setLoadingStateAction(true));
  try {
    const apiConfig = yield select(getAPIConfig, 'user', 'createUser');
    const tenant = yield select(getTenantName);
    const config = {
      ...apiConfig,
      data: action.payload,
    };
    const response = yield callAPIWithConfig(tenant, 'createUser', config);
    if (response.id) {
      yield put(userCreateSuccessAction());
    } else {
      yield put(userCreateFailAction());
    }
  } catch (e) {
    yield put(userCreateFailAction());
  } finally {
    yield put(setLoadingStateAction(false));
  }
}

export function* editUserSaga(action) {
  yield put(setLoadingStateAction(true));
  try {
    const apiConfig = yield select(getAPIConfig, 'user', 'editUser');
    const tenant = yield select(getTenantName);
    const config = {
      ...apiConfig,
      data: action.payload,
      urlValuesMap: { id: action.id },
    };
    const response = yield callAPIWithConfig(tenant, 'editUser', config);
    if (response.id) {
      yield put(userCreateSuccessAction());
    } else {
      yield put(userCreateFailAction());
    }
  } catch (e) {
    yield put(userCreateFailAction());
  } finally {
    yield put(setLoadingStateAction(false));
  }
}

export function* patchUserSaga(action) {
  yield put(setLoadingStateAction(true));
  try {
    const apiConfig = yield select(getAPIConfig, 'user', 'patchUser');
    const tenant = yield select(getTenantName);
    const config = {
      ...apiConfig,
      data: JSON.stringify(action.payload),
      urlValuesMap: { id: action.id },
    };
    const response = yield callAPIWithConfig(tenant, 'patchUser', config);
    if (response.id) {
      yield put(userCreateSuccessAction());
    } else {
      yield put(userCreateFailAction());
    }
  } catch (e) {
    yield put(userCreateFailAction());
  } finally {
    yield put(setLoadingStateAction(false));
  }
}

export function* fetchUserFromPhoneSaga(action) {
  try {
    const apiConfig = yield select(getAPIConfig, 'user', 'fetchUserFromPhone');
    const tenant = yield select(getTenantName);
    const config = {
      ...apiConfig,
      urlValuesMap: { phoneNumber: action.formData.mobile },
    };
    yield put(setLoadingStateAction(true));
    const response = yield callAPIWithConfig(tenant, 'fetchUserFromPhone', config);
    yield put(setLoadingStateAction(false));
    yield put(fetchUserFromPhoneSuccess(response));
    if (response.length === 0) {
      window.location.href = '#/user-registration';
    }
  } catch (e) {
    yield put(setLoadingStateAction(false));
    yield put(fetchUserFromPhoneFailed());
  }
}
