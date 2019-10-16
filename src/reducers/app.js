const initialState = {
  bootstrapped: false,
};

export const appConfig = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_APP_CONFIG': {
      return {
        ...state,
        config: action.config,
      };
    }
    case 'SET_BOOTSTRAPPED_FLAG': {
      return {
        ...state,
        bootstrapped: action.flag,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getAppConfig = state => state.appConfig.config;

export const getBootstrappedFlag = state => state.appConfig.bootstrapped;
