import { put } from 'redux-saga/effects';

import { setLoadingStateAction } from 'actions/loaderActions';
import { setAppConfigAction } from 'actions/app';
import { getAppConfigSaga, getBusCoordinatorsConfigSaga } from 'sagas/assetFilesSaga';

export function* bootstrapApplication() {
  try {
    yield put(setLoadingStateAction(true));
    yield getAppConfigSaga();
    yield getBusCoordinatorsConfigSaga();
    yield put(setAppConfigAction());
  } catch (e) {
    console.error('Error - ', e);
    yield put(setLoadingStateAction(false));
  } finally {
    yield put(setLoadingStateAction(false));
  }

}
