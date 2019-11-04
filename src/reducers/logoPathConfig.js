const initialState = {
  logoPathConfig: {},
  errorMessage: '',
};

export const logoPathConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_LOGO_PATH_CONFIG_SUCCESS_ACTION':
      return {
        ...state,
        logoPathConfig: action.logoPathConfig,
        errorMessage: '',
      };
    case 'LOAD_LOGO_PATH_CONFIG_FAILED_ACTION':
      return {
        ...state,
        logoPathConfig: {},
        errorMessage: action.errorMessage,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getLogoPathConfig = state => state.logoPathConfigReducer.logoPathConfig;
