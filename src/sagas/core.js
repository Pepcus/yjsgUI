import { put, select } from 'redux-saga/effects';

import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import {
  setBootstrappedFlag,
} from 'actions/app';

import { getAppThemeSaga } from 'sagas/theme';
import { getAppConfig, getTenantName } from 'reducers/app';
import { getAppConfigSaga, getBusCoordinatorsConfigSaga } from 'sagas/assetFilesSaga';
import { fetchAppConfig } from 'apis/core';
import { setApplicationConfigurationAction } from 'actions/config';

function* getAppConfigurableDataSaga() {
  const tenant = yield select(getTenantName);
  const appConfig = yield fetchAppConfig(tenant);
  yield put(setApplicationConfigurationAction(appConfig));
}

function* getApplicationConstants() {
  const tenant = yield select(getTenantName);
}

export function* bootstrapApplication() {
  try {
    yield put(setLoadingStateAction(true));
    yield getAppConfigSaga();
    yield select(getAppConfig);
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
