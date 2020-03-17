import { put, select } from 'redux-saga/effects';
import { getAppTheme } from 'apis/core';
import {
  loadAppThemeSuccessAction,
  loadAppThemeFailedAction,
} from 'actions/themeActions';
import { getTenantName } from 'reducers/app';

export function* getAppThemeSaga() {
  const errorMessage = 'Unable to fetch theme.';
  try {
    const tenant = yield select(getTenantName);
    const appTheme = yield getAppTheme({ tenant: tenant ? tenant : 'default' });
    if (appTheme) {
      yield put(loadAppThemeSuccessAction(appTheme));
    } else {
      yield put(loadAppThemeFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadAppThemeFailedAction(errorMessage));
  }
}
