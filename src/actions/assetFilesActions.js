/**
 * fetchFilesConfigAction action will call for fetching fileConfig json file.
 * @return {{type: string}}
 */
export const fetchFilesConfigAction = () => ({
  type: 'FETCH_FILES_CONFIG_ACTION',
});

/**
 * fetchFilesConfigSuccessAction action will call when fetchFilesConfigAction is success.
 * @param {Object} config
 * @return {{type: string, config: *}}
 */
export const fetchFileConfigSuccessAction = config => ({
  type: 'FETCH_FILES_CONFIG_SUCCESS_ACTION',
  config,
});

/**
 * fetchFileConfigFailedAction action will call when fetchFilesConfigAction is fail.
 * @param {String} errorMessage
 * @return {{errorMessage: *, type: string}}
 */
export const fetchFileConfigFailedAction = errorMessage => ({
  type: 'FETCH_FILES_CONFIG_FAILED_ACTION',
  errorMessage,
});

/**
 * loadAppDataAction action will call for fetching app json file.
 * @return {{type: string}}
 */
export const loadAppDataAction = () => ({
  type: 'LOAD_APP_DATA_ACTION',
});

/**
 * loadBusCoordinatorsDataAction action will call for fetching busCoordinators json file.
 * @return {{type: string}}
 */
export const loadBusCoordinatorsDataAction = () => ({
  type: 'LOAD_BUS_COORDINATORS_DATA_ACTION',
});

/**
 * loadBusCoordinatorsDataSuccessAction action will call when loadBusCoordinatorsDataAction is success.
 * @param {Object} busCoordinators
 * @return {{busCoordinators: *, type: string}}
 */
export const loadBusCoordinatorsDataSuccessAction = busCoordinators => ({
  type: 'LOAD_BUS_COORDINATORS_DATA_SUCCESS_ACTION',
  busCoordinators,
});

/**
 * loadBusCoordinatorsDataFailedAction action will call when loadBusCoordinatorsDataAction is fail.
 * @param {String} errorMessage
 * @return {{errorMessage: *, type: string}}
 */
export const loadBusCoordinatorsDataFailedAction = errorMessage => ({
  type: 'LOAD_BUS_COORDINATORS_DATA_FAILED_ACTION',
  errorMessage,
});

/**
 * loadedAppDataSuccessAction action will call when loadAppDataAction is success.
 * @param {Object} modeVariable
 * @return {{modeVariable: *, type: string}}
 */
export const loadedAppDataSuccessAction = modeVariable => ({
  type: 'LOADED_APP_DATA_SUCCESS_ACTION',
  modeVariable,
});

/**
 * loadAppDataFailedAction action will call when loadAppDataAction is fail.
 * @param {Object} errorMessage
 * @return {{errorMessage: *, type: string}}
 */
export const loadAppDataFailedAction = errorMessage => ({
  type: 'LOAD_APP_DATA_FAILED_ACTION',
  errorMessage,
});

