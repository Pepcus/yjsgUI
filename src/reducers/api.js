import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

const initialState = {};

const api = (state = initialState, { type, ...actionProps }) => {
  switch (type) {
    case 'SET_API_CONFIG': {
      return {
        ...actionProps.config,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default api;

export const getAPIConfig = (state, entity, identifier) => {
  if (!entity || !identifier) {
    console.error('\'entity\' and \'identifier\' are required parameters for \'getAPIConfig\' selector');
    return null;
  }

  const apiConfig = _get(state, `api.apis.${entity}.${identifier}`, {});

  if (_isEmpty(apiConfig.headers)) {
    apiConfig.headers = _get(state, 'api.config.defaultHeaders');
  }

  if (!apiConfig.baseUrl) {
    apiConfig.baseUrl = _get(state, 'api.config.defaultBaseUrl');
  }

  return apiConfig;
};
