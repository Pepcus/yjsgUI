import { put, select } from 'redux-saga/effects';

import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import {
  setBootstrappedFlag,
} from 'actions/app';
import {
  getAppConfigSaga,
  getBusCoordinatorsConfigSaga,
} from 'sagas/assetFilesSaga';
import { getAppThemeSaga } from 'sagas/theme';
import { getAppConfig } from 'reducers/app';

export function* bootstrapApplication() {
  try {
    yield put(setLoadingStateAction(true));
    yield getAppConfigSaga();
    const config = yield select(getAppConfig);
    yield getAppThemeSaga({ tenant: config.tenant ? config.tenant : 'default' });
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
