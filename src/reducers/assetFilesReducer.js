const initialState = {
  fileData: [],
  isLoading: false,
  errorMessage: '',
  filesConfig: {},
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

    case 'LOAD_BUS_COORDINATORS_DATA_ACTION':
      return {
        ...state,
        isBusCoordinatorsDataFailed: false,
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

export const getFileData = state => state.assetFilesReducer.fileData;

export const isLoading = state => state.assetFilesReducer.isLoading;

export const getFilesConfig = state => state.assetFilesReducer.filesConfig;

export const getBusCoordinators = state => state.assetFilesReducer.busCoordinators;

export const isBusCoordinatorsDataFailed = state => state.assetFilesReducer.isBusCoordinatorsDataFailed;
