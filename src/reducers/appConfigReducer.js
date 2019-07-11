const initialState = {
  isLoading: false,
  errorMessage: '',
  modeVariable: '',
  tenant: '',
  isAppLoaded: false,
  isAppLoadingFailed: false,
  isRegisterCorrectionEnabled: false,
};

export const appConfigReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'LOAD_APP_DATA_ACTION':
      return {
        ...state,
        isAppLoaded: false,
        isAppLoadingFailed: false,
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

    default: {
      return {
        ...state,
      };
    }
  }
};

export const getApplicationMode = state => state.appConfigReducer.modeVariable;

export const isAppLoaded = state => state.appConfigReducer.isAppLoaded;

export const getIsAppLoadedError = state => state.appConfigReducer.isAppLoadingFailed;

export const getTenantName = state => state.appConfigReducer.tenant;

export const isRegisterCorrectionEnabled = state => state.appConfigReducer.isRegisterCorrectionEnabled;

