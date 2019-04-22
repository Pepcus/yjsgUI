import { put } from 'redux-saga/effects';

import {
  fetchFileConfigFailedAction,
  fetchFileConfigSuccessAction,
  loadedAppDataSuccessAction,
  loadAppDataFailedAction,
  loadBusCoordinatorsDataSuccessAction,
  loadBusCoordinatorsDataFailedAction,
} from '../actions/assetFilesActions';
import { fetchFileConfig, getAppConfig, getBusCoordinatorsConfig } from './assetFilesAPI';

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
    console.error(e);
    yield put(fetchFileConfigFailedAction(errorMessage));
  }
}

export function* getAppConfigSaga() {
  const errorMessage = 'Unable to fetch  config.';
  try {
    const response = yield getAppConfig();
    if (response) {
      yield put(loadedAppDataSuccessAction(response));
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
