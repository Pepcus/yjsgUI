
export const fetchFilesConfigAction = () => ({
  type: 'FETCH_FILES_CONFIG_ACTION',
});

export const fetchFileConfigSuccessAction = config => ({
  type: 'FETCH_FILES_CONFIG_SUCCESS_ACTION',
  config,
});

export const fetchFileConfigFailedAction = errorMessage => ({
  type: 'FETCH_FILES_CONFIG_FAILED_ACTION',
  errorMessage,
});

export const loadAppDataAction = () => ({
  type: 'LOAD_APP_DATA_ACTION',
});
export const loadBusCoordinatorsDataAction = () => ({
  type: 'LOAD_BUS_COORDINATORS_DATA_ACTION',
});

export const loadedBusCoordinatorsDataSuccessAction = busCoordinators => ({
  type: 'LOADED_BUS_COORDINATORS_DATA_SUCCESS_ACTION',
  busCoordinators,
});

export const loadBusCoordinatorsDataFailedAction = errorMessage => ({
  type: 'LOAD_BUS_COORDINATORS_DATA_FAILED_ACTION',
  errorMessage,
});
export const loadedAppDataSuccessAction = modeVariable => ({
  type: 'LOADED_APP_DATA_SUCCESS_ACTION',
  modeVariable,
});

export const loadAppDataFailedAction = errorMessage => ({
  type: 'LOAD_APP_DATA_FAILED_ACTION',
  errorMessage,
});

