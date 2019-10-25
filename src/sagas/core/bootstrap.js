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
  getColumnList,
  getLogoPathConfig,
  getGridMetaData,
} from 'apis/core';
import { setApplicationConfigurationAction } from 'actions/config';
import { mergeObjects } from 'utils/common/object';
import {
  setAppConstantsAction,
} from 'actions/appConstantsActions';
import { setAPIConfigAction } from 'actions/api';
import {
  loadColumnListFailedAction,
  loadColumnListSuccessAction,
} from 'actions/columnListAction';
import {
  loadLogoPathConfigFailedAction,
  loadLogoPathConfigSuccessAction,
} from 'actions/logoPathConfigAction';
import {
  loadGridMetaDataFailedAction,
  loadGridMetaDataSuccessAction,
} from 'actions/gridMetaDataAction';

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
      yield put(loadedAppDataSuccessAction(appConfig));
      yield put(setAppConfigAction({ ...appConfig }));
    } else {
      yield put(loadAppDataFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadAppDataFailedAction(errorMessage));
  }
}

export function* getGridMetaDataSaga() {
  const errorMessage = '';
  const tenant = yield select(getTenantName);
  try {
    const response = yield getGridMetaData({ tenant: tenant ? tenant : 'default' });
    if (response) {
      yield put(loadGridMetaDataSuccessAction(response));
    } else {
      yield put(loadGridMetaDataFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadGridMetaDataFailedAction(errorMessage));
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

export function* getColumnListSaga() {
  const errorMessage = '';
  const tenant = yield select(getTenantName);
  try {
    const response = yield getColumnList({ tenant: tenant ? tenant : 'default' });
    if (response) {
      yield put(loadColumnListSuccessAction(response));
    } else {
      yield put(loadColumnListFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadColumnListFailedAction(errorMessage));
  }
}

export function* getLogoPathConfigSaga() {
  const errorMessage = '';
  const tenant = yield select(getTenantName);
  try {
    const response = yield getLogoPathConfig({ tenant: tenant ? tenant : 'default' });
    if (response) {
      yield put(loadLogoPathConfigSuccessAction(response));
    } else {
      yield put(loadLogoPathConfigFailedAction(errorMessage));
    }
  } catch (e) {
    console.error(e);
    yield put(loadLogoPathConfigFailedAction(errorMessage));
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
    // GET grid meta data
    yield getGridMetaDataSaga();
    // GET Column list file
    yield getColumnListSaga();
    // GET Logo path config
    yield getLogoPathConfigSaga();
    // TODO by Pratik: Remove this call from bootstrap
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
