import get from 'lodash/get';

const initialState = {
  bootstrapped: false,
};

const appConfig = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'SET_APP_CONFIG': {
      return {
        ...state,
        ...action.config,
        tenant: action.config.tenant || 'default',
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

export const getAppConfig = state => state.appConfig;

export const isBootstrapComplete = state => state.appConfig.bootstrapped;

export const getTenantName = state => get(state, 'appConfig.tenant');

export default appConfig;
