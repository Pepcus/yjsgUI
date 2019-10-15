import {put} from 'redux-saga/effects';

import { getAppConfig } from 'apis/assetFilesAPI';
import { setLoadingStateAction } from 'actions/loaderActions';
import { setAppConfigAction } from 'actions/app';

export function* bootstrapApplication(action) {
  console.log('bootstrapApplication --- ', action);

  try {
    yield put(setLoadingStateAction(true));
    const appConfig = yield getAppConfig();

    yield put(setAppConfigAction(appConfig));
    console.log('appConfig --- ', appConfig);
  } catch (e) {
    console.error('Error - ', e);
  } finally {
    yield put(setLoadingStateAction(false));
  }

}
