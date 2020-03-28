import { put, select } from 'redux-saga/effects';

import { callAPIWithConfig } from 'apis/apis';
import {
  createCoordinatorFailedAction,
  createCoordinatorSuccessAction,
  fetchCoordinatorDepartmentsFailedAction,
  fetchCoordinatorDepartmentsSuccessAction,
  fetchCoordinatorFailedAction,
  fetchCoordinatorsFailedAction,
  fetchCoordinatorsSuccessAction,
  fetchCoordinatorSuccessAction,
  updateCoordinatorFailedAction,
  updateCoordinatorSuccessAction,
} from 'actions/coordinatorRegistrationActions';
import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import { getAPIConfig } from 'reducers/api';
import { getTenantName } from 'reducers/app';

/**
 * createCoordinatorSaga sage call when create a new coordinator.
 * @param {Object} action
 */


export function* createCoordinatorSaga(action) {
  const { coordinator } = action;

  const errorMessage = 'Error creating new coordinator.';

  const apiConfig = yield select(getAPIConfig, 'coordinator', 'createCoordinator');

  try {
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, data: coordinator };
    const response = yield callAPIWithConfig(tenant, 'createCoordinator', config);


    if (!response.error) {
      yield put(createCoordinatorSuccessAction(response));
    } else {
      yield put(createCoordinatorFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(createCoordinatorFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

export function* fetchCoordinatorsSaga() {
  const apiConfig = yield select(getAPIConfig, 'coordinator', 'getCoordinators');
  const errorMessage = 'Unable to fetch coordinators';
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const response = yield callAPIWithConfig(tenant, 'getCoordinators', apiConfig);
    if (!response.error) {
      yield put(fetchCoordinatorsSuccessAction(response));
    } else {
      yield put(fetchCoordinatorsFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchCoordinatorsFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

/**
 * fetchCoordinatorSaga saga call when fetch particular coordinator
 * @param {Object} action
 */
export function* fetchCoordinatorSaga(action) {
  const { id, secretKey } = action;
  const errorMessage = 'Error fetching coordinator details.';
  const apiConfig = yield select(getAPIConfig, 'coordinator', 'getCoordinator');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, urlValuesMap: { id }, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'getCoordinator', config);

    if (!response.error) {
      yield put(fetchCoordinatorSuccessAction(response));
    } else {
      yield put(fetchCoordinatorFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchCoordinatorFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

/**
 * fetchCoordinatorSaga saga call when fetch particular coordinator
 * @param {Object} action
 */
export function* fetchCoordinatorDepartmentsSaga(action) {
  const errorMessage = 'Error fetching coordinator departments.';
  const apiConfig = yield select(getAPIConfig, 'coordinator', 'fetchCoordinatorDepartments');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig };
    const response = yield callAPIWithConfig(tenant, 'fetchCoordinatorDepartments', config);

    if (!response.error) {
      yield put(fetchCoordinatorDepartmentsSuccessAction(response));
    } else {
      yield put(fetchCoordinatorDepartmentsFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchCoordinatorDepartmentsFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

/**
 * updateCoordinatorSaga saga call when update coordinator.
 * @param {Object} action
 */
export function* updateCoordinatorSaga(action) {
  const { id, secretKey, coordinator } = action;
  const errorMessage = 'Error updating coordinator details.';
  const apiConfig = yield select(getAPIConfig, 'coordinator', 'updateCoordinator');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, urlValuesMap: { id }, data: coordinator, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'updateCoordinator', config);

    if (!response.error) {
      yield put(updateCoordinatorSuccessAction(response));
    } else {
      yield put(updateCoordinatorFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(updateCoordinatorFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}
