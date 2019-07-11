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
 * @return {{errorMessage: string, type: string}}
 */
export const fetchFileConfigFailedAction = errorMessage => ({
  type: 'FETCH_FILES_CONFIG_FAILED_ACTION',
  errorMessage,
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
 * @return {{busCoordinators: Object, type: string}}
 */
export const loadBusCoordinatorsDataSuccessAction = busCoordinators => ({
  type: 'LOAD_BUS_COORDINATORS_DATA_SUCCESS_ACTION',
  busCoordinators,
});

/**
 * loadBusCoordinatorsDataFailedAction action will call when loadBusCoordinatorsDataAction is fail.
 * @param {String} errorMessage
 * @return {{errorMessage: String, type: string}}
 */
export const loadBusCoordinatorsDataFailedAction = errorMessage => ({
  type: 'LOAD_BUS_COORDINATORS_DATA_FAILED_ACTION',
  errorMessage,
});
