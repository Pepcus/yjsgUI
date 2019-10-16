import { put } from 'redux-saga/effects';

import { getAppConfig } from 'apis/core';
import { setLoadingStateAction } from 'actions/loaderActions';
import { setAppConfigAction } from 'actions/app';
import { getAppConfigSaga, getBusCoordinatorsConfigSaga } from 'sagas/assetFilesSaga';

export function* bootstrapApplication() {
  try {
    yield put(setLoadingStateAction(true));
    const appConfig = yield getAppConfig();
    yield getAppConfigSaga();
    yield getBusCoordinatorsConfigSaga();
    yield put(setAppConfigAction(appConfig));
  } catch (e) {
    console.error('Error - ', e);
    yield put(setLoadingStateAction(false));
  } finally {
    yield put(setLoadingStateAction(false));
  }

}
