import { put } from 'redux-saga/effects';

import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import {
  setBootstrappedFlag,
} from 'actions/app';

import { getAppConfigSaga, getBusCoordinatorsConfigSaga } from 'sagas/assetFilesSaga';

export function* bootstrapApplication() {
  try {
    yield put(setLoadingStateAction(true));
    yield getAppConfigSaga();
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
