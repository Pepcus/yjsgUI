import { put, select } from 'redux-saga/effects';

import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import {
  setAppConfigAction,
  setBootstrappedFlag,
} from 'actions/app';
import {
  loadBusCoordinatorsDataSuccessAction,
  loadBusCoordinatorsDataFailedAction,
  loadedAppDataSuccessAction,
  loadAppDataFailedAction,
} from 'actions/assetFilesActions';
import { getAppThemeSaga } from 'sagas/core/theme';
import { getTenantName } from 'reducers/app';
import {
  fetchAppConfig,
  getAppConfig,
  getBusCoordinatorsConfig,
  getAppConstants,
  getAPIConfig,
} from 'apis/core';
import { setApplicationConfigurationAction } from 'actions/config';
import { mergeObjects } from 'utils/common/object';
import {
  setAppConstantsAction,
} from 'actions/appConstantsActions';
import { setAPIConfigAction } from 'actions/api';
import { setDefaultUserData } from 'actions/userActions';
import { getUpdatedAppConfig } from 'utils/core/coreUtils';
import { fetchCoordinatorDepartmentsSaga } from 'sagas/coordinator';

function* getAppConfigurableDataSaga() {
  const tenant = yield select(getTenantName);
  const appConfig = yield fetchAppConfig({ tenant: tenant ? tenant : 'default' });
  yield put(setApplicationConfigurationAction(appConfig));
}

function* getApplicationConstants() {
  const tenant = yield select(getTenantName);
  const defaultConstantsConfig = yield getAppConstants({ tenant: 'default' });
  const tenantConstantsConfig = yield getAppConstants({ tenant: tenant ? tenant : 'default' });
  const text = mergeObjects(defaultConstantsConfig, tenantConstantsConfig);
  yield put(setAppConstantsAction({ text }));
}

function* getAPIConfigSaga() {
  const tenant = yield select(getTenantName);
  const apiConfig = yield getAPIConfig({ tenant: tenant ? tenant : 'default' });
  yield put(setAPIConfigAction(apiConfig));
}

export function* getAppConfigSaga() {
  const errorMessage = 'Unable to fetch config.';
  try {
    const appConfig = yield getAppConfig();
    if (appConfig) {
      yield put(loadedAppDataSuccessAction(getUpdatedAppConfig(appConfig)));
      yield put(setAppConfigAction(getUpdatedAppConfig({ ...appConfig })));
    } else {
      yield put(loadAppDataFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadAppDataFailedAction(errorMessage));
  }
}

export function* getBusCoordinatorsConfigSaga() {
  const errorMessage = 'Unable to fetch  bus coordinators config.';
  try {
    const response = yield getBusCoordinatorsConfig();
    if (response) {
      yield put(loadBusCoordinatorsDataSuccessAction(response));
    } else {
      yield put(loadBusCoordinatorsDataFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadBusCoordinatorsDataFailedAction(errorMessage));
  }
}

export function* bootstrapApplication() {
  try {
    yield put(setLoadingStateAction(true));
    // GET application ui_config file
    yield getAppConfigSaga();
    // GET application API config file
    yield getAPIConfigSaga();
    // GET application theme config
    yield getAppThemeSaga();
    // GET application tenant specific app.json
    yield getAppConfigurableDataSaga();
    // GET application's configurable constants file
    yield getApplicationConstants();
    // TODO by Pratik: Remove this call from bootstrap
    yield fetchCoordinatorDepartmentsSaga();
    yield getBusCoordinatorsConfigSaga();
    yield put(setBootstrappedFlag(true));
    // For resetting the user data after page refresh.
    yield put(setDefaultUserData());
  } catch (e) {
    console.error('Error - ', e);
    yield put(setBootstrappedFlag(false));
    yield put(setLoadingStateAction(false));
  } finally {
    yield put(setLoadingStateAction(false));
  }
}
