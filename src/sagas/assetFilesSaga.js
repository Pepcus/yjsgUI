import { put } from 'redux-saga/effects';

import {
  fetchFileConfigFailedAction,
  fetchFileConfigSuccessAction,
  loadedAppDataSuccessAction,
  loadAppDataFailedAction,
} from '../actions/assetFilesActions';
import { fetchFileConfig, getAppConfig } from './assetFilesAPI';

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
