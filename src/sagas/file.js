import { put, select } from 'redux-saga/effects';

import {
  fetchFileConfigFailedAction,
  fetchFileConfigSuccessAction,
} from 'actions/assetFilesActions';
import { getAPIConfig } from 'reducers/api';
import { setLoadingStateAction } from 'actions/loaderActions';
import { getTenantName } from 'reducers/app';
import { callAPIWithConfig } from 'apis/apis';

export function* fetchFilesConfigSaga() {
  const errorMessage = 'Unable to fetch file config.';
  const apiConfig = yield select(getAPIConfig, 'file', 'fetchFileConfig');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig };
    const response = yield callAPIWithConfig(tenant, 'fetchFileConfig', config);

    if (response) {
      yield put(fetchFileConfigSuccessAction(response));
    } else {
      yield put(fetchFileConfigFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    console.error(e);
    yield put(fetchFileConfigFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}
