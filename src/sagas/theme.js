import { put } from 'redux-saga/effects';
import { getAppTheme } from 'apis/core';
import {
  loadedAppThemeSuccessAction,
  loadAppThemeFailedAction,
} from 'actions/themeActions';

export function* getAppThemeSaga({ tenant }) {
  const errorMessage = 'Unable to fetch theme.';
  try {
    const appTheme = yield getAppTheme({ tenant });
    if (appTheme) {
      yield put(loadedAppThemeSuccessAction(appTheme));
    } else {
      yield put(loadAppThemeFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadAppThemeFailedAction(errorMessage));
  }
}
