const initialState = {};

const config = (state = initialState, { type, ...actionProps }) => {
  switch (type) {
    case 'SET_APPLICATION_CONFIGURATION': {
      return {
        ...actionProps.config,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default config;

export const getApplicationConfiguration = state => state.config;

export const getApplicationRoutes = state => state.config.routes;

export const getLogoPathConfig = state => state.config.logoPathConfig;
