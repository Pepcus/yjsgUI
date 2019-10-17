import { put } from 'redux-saga/effects';

import {
  fetchFileConfigFailedAction,
  fetchFileConfigSuccessAction,
} from 'actions/assetFilesActions';
import {
  fetchFileConfig,
} from 'apis/file';

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
