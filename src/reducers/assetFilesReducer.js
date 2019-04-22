const initialState = {
  fileData: [],
  isLoading: false,
  errorMessage: '',
  filesConfig: {},
  modeVariable: '',
  isAppLoaded: false,
  isAppLoadedError: false,
};

export const assetFilesReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_FILES_CONFIG_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        filesConfig: action.config,
      };
    case 'FETCH_FILES_CONFIG_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        filesConfig: {},
      };
    case 'FETCH_FILES_CONFIG_ACTION':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOAD_APP_DATA_ACTION':
      return {
        ...state,
        isAppLoaded: false,
        isAppLoadedError: false,
      };
    case 'LOADED_APP_DATA_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        isAppLoaded: true,
        modeVariable: action.modeVariable.environment,
        isAppLoadedError: false,
      };
    case 'LOAD_APP_DATA_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        modeVariable: '',
        isAppLoaded: false,
        isAppLoadedError: true,
      };
    case 'LOAD_BUS_COORDINATORS_DATA_ACTION':
      return {
        ...state,
        isBusCoordinatorsDataLoadedError: false,
      };
    case 'LOADED_BUS_COORDINATORS_DATA_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        busCoordinators: action.busCoordinators,
        isBusCoordinatorsDataLoadedError: false,
      };
    case 'LOAD_BUS_COORDINATORS_DATA_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        busCoordinators: {},
        isBusCoordinatorsDataLoadedError: true,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getFileData = state => state.assetFilesReducer.fileData;

export const isLoading = state => state.assetFilesReducer.isLoading;

export const getFilesConfig = state => state.assetFilesReducer.filesConfig;

export const getApplicationMode = state => state.assetFilesReducer.modeVariable;

export const isAppLoaded = state => state.assetFilesReducer.isAppLoaded;

export const getIsAppLoadedError = state => state.assetFilesReducer.isAppLoadedError;

export const getBusCoordinators = state => state.assetFilesReducer.busCoordinators;

export const isBusCoordinatorsDataLoadedError = state => state.assetFilesReducer.isBusCoordinatorsDataLoadedError;
