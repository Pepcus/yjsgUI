const initialState = {
  appConstants: {},
  hasConstantsConfig: false,
  errorMessage: '',
};

export const constantsConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_CONSTANTS_CONFIG_SUCCESS_ACTION': {
      return {
        ...state,
        appConstants: action.appConstants,
        hasConstantsConfig: true,
        errorMessage: '',
      };
    }
    case 'LOAD_CONSTANTS_CONFIG_FAILED_ACTION': {
      return {
        ...state,
        hasConstantsConfig: false,
        errorMessage: action.errorMessage,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getAppConstantsConfig = state => state.constantsConfigReducer.appConstants;
