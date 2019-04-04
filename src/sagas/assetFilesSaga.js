import { put } from 'redux-saga/effects';
import csv from 'csvtojson';

import { formatXlsxToJson } from '../utils/fileUtils';
import {
  fetchFileConfigFailedAction,
  fetchFileConfigSuccessAction,
  fetchFileFailedAction,
  fetchFileSuccessAction,
  loadedAppDataSuccessAction,
  loadAppDataFailedAction,
} from '../actions/assetFilesActions';
import { fetchFile, fetchFileConfig, getAppConfig } from './assetFilesAPI';

/**
 * fetchFilesSaga fetch csv/excel files to show them in a tabular form.
 * @param {Object} action
 */
export function* fetchFilesSaga(action) {
  const { fileDetails } = action;
  const errorMessage = 'Unable to fetch file.';
  let fileData;
  try {
    const response = yield fetchFile(fileDetails);
    if (response) {
      if (fileDetails.fileType === 'csv') {
        fileData
          = yield new Promise((resolve) => {
            csv()
              .fromString(response)
              .then(csvRow => resolve(csvRow));
          });
      } else if (fileDetails.fileType === 'xlsx' || fileDetails.fileType === 'xls') {
        fileData = formatXlsxToJson(response);
      }
      yield put(fetchFileSuccessAction(fileData));
    } else {
      yield put(fetchFileFailedAction(errorMessage));
    }
  } catch (e) {
    yield put(fetchFileFailedAction(errorMessage));
  }
}

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