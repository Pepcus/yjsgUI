/**
 * loadAppDataAction action will call for fetching app json file.
 * @return {{type: string}}
 */
export const loadAppDataAction = () => ({
  type: 'LOAD_APP_DATA_ACTION',
});

/**
 * loadedAppDataSuccessAction action will call when loadAppDataAction is success.
 * @param {Object} modeVariable
 * @return {{modeVariable: Object, type: string}}
 */
export const loadedAppDataSuccessAction = modeVariable => ({
  type: 'LOADED_APP_DATA_SUCCESS_ACTION',
  modeVariable,
});

/**
 * loadAppDataFailedAction action will call when loadAppDataAction is fail.
 * @param {String} errorMessage
 * @return {{errorMessage: String, type: string}}
 */
export const loadAppDataFailedAction = errorMessage => ({
  type: 'LOAD_APP_DATA_FAILED_ACTION',
  errorMessage,
});

