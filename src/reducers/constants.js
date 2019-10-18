const initialState = {};

export const constants = (state = initialState, { type, ...actionProps }) => {
  switch (type) {
    case 'SET_APP_CONSTANTS_ACTION': {
      return {
        ...state,
        ...actionProps.appConstants,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export const getAppConstantsConfig = state => state.constants;
