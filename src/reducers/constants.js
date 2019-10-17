const initialState = {
  appConstants: {},
};

export const constants = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APP_CONSTANTS_ACTION': {
      return {
        ...state,
        appConstants: action.appConstants,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export const getAppConstantsConfig = state => state.constants.appConstants;
