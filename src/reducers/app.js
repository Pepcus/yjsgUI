const initialState = {
  bootstrapped: false,
};

const appConfig = (state = { ...initialState }, { type, ...rest }) => {
  switch (type) {
    case 'SET_APP_CONFIG': {
      return {
        ...state,
        ...rest,
        bootstrapped: true,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export const getAppConfig = state => state.appConfig;

export default appConfig;
