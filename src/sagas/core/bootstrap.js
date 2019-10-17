import { put, select } from 'redux-saga/effects';

import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import {
  setAppConfigAction,
  setBootstrappedFlag,
} from 'actions/app';
import {
  loadBusCoordinatorsDataSuccessAction,
  loadBusCoordinatorsDataFailedAction,
  loadedAppDataSuccessAction,
  loadAppDataFailedAction,
} from 'actions/assetFilesActions';
import { getAppThemeSaga } from 'sagas/core/theme';
import { getTenantName } from 'reducers/app';
import {
  fetchAppConfig,
  getAppConfig,
  getBusCoordinatorsConfig,
} from 'apis/core';
import { setApplicationConfigurationAction } from 'actions/config';

function* getAppConfigurableDataSaga() {
  const tenant = yield select(getTenantName);
  const appConfig = yield fetchAppConfig(tenant);
  yield put(setApplicationConfigurationAction(appConfig));
}

function* getApplicationConstants() {
  const tenant = yield select(getTenantName);
}

export function* getAppConfigSaga() {
  const errorMessage = 'Unable to fetch config.';
  try {
    const appConfig = yield getAppConfig();
    if (appConfig) {
      yield put(loadedAppDataSuccessAction(appConfig));
      yield put(setAppConfigAction({ ...appConfig }));
    } else {
      yield put(loadAppDataFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadAppDataFailedAction(errorMessage));
  }
}

export function* getBusCoordinatorsConfigSaga() {
  const errorMessage = 'Unable to fetch  bus coordinators config.';
  try {
    const response = yield getBusCoordinatorsConfig();
    if (response) {
      yield put(loadBusCoordinatorsDataSuccessAction(response));
    } else {
      yield put(loadBusCoordinatorsDataFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadBusCoordinatorsDataFailedAction(errorMessage));
  }
}

export function* bootstrapApplication() {
  try {
    yield put(setLoadingStateAction(true));
    yield getAppConfigSaga();
    yield getAppThemeSaga();
    yield getAppConfigurableDataSaga();
    yield getApplicationConstants();
    yield getBusCoordinatorsConfigSaga();
    yield put(setBootstrappedFlag(true));
  } catch (e) {
    console.error('Error - ', e);
    yield put(setBootstrappedFlag(false));
    yield put(setLoadingStateAction(false));
  } finally {
    yield put(setLoadingStateAction(false));
  }
}
