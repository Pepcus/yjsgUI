const initialState = {
  isLoading: false,
  errorMessage: '',
  filesConfig: {},
  modeVariable: '',
  tenant: '',
  isAppLoaded: false,
  isAppLoadingFailed: false,
  isRegisterCorrectionEnabled: false,
  isBusCoordinatorsDataFailed: false,
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
    case 'LOADED_APP_DATA_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        isAppLoaded: true,
        modeVariable: action.modeVariable.environment,
        tenant: action.modeVariable.tenant,
        isAppLoadingFailed: false,
        isRegisterCorrectionEnabled: action.modeVariable.isRegisterCorrectionEnabled,
      };
    case 'LOAD_APP_DATA_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        modeVariable: '',
        tenant: '',
        isAppLoaded: false,
        isAppLoadingFailed: true,
        isRegisterCorrectionEnabled: false,
      };
    case 'LOAD_BUS_COORDINATORS_DATA_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        busCoordinators: action.busCoordinators,
        isBusCoordinatorsDataFailed: false,
      };
    case 'LOAD_BUS_COORDINATORS_DATA_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        busCoordinators: {},
        isBusCoordinatorsDataFailed: true,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getFilesConfig = state => state.assetFilesReducer.filesConfig;

export const getApplicationMode = state => state.assetFilesReducer.modeVariable;

export const isAppLoaded = state => state.assetFilesReducer.isAppLoaded;

export const getIsAppLoadedError = state => state.assetFilesReducer.isAppLoadingFailed;

export const getBusCoordinators = state => state.assetFilesReducer.busCoordinators;

export const isBusCoordinatorsDataFailed = state => state.assetFilesReducer.isBusCoordinatorsDataFailed;

export const getApplicationTenant = state => state.assetFilesReducer.tenant;

export const isRegisterCorrectionEnabled = state => state.assetFilesReducer.isRegisterCorrectionEnabled;
