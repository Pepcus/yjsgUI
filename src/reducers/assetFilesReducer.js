const initialState = {
  fileData: [],
  isLoading: false,
  errorMessage: '',
  filesConfig: {},
  modeVariable: {},
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
    case 'FETCH_FILE_ACTION':
      return {
        ...state,
        isLoading: true,
        fileData: [],
      };
    case 'FETCH_FILE_SUCCESS_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        fileData: action.file,
      };
    case 'FETCH_FILE_FAIL_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        fileData: [],
      };
    case 'LOADED_APP_DATA_ACTION':
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
        modeVariable: action.modeVariable,
        isAppLoadedError: false,
      };
    case 'LOADED_APP_DATA_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        modeVariable: {},
        isAppLoaded: false,
        isAppLoadedError: true,
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

export const getModeVariable = state => state.assetFilesReducer.modeVariable;

export const getIsAppLoaded = state => state.assetFilesReducer.isAppLoaded;

export const getIsAppLoadedError = state => state.assetFilesReducer.isAppLoadedError;