const initialState = {};

export const constants = (state = initialState, { type, ...actionProps }) => {
  switch (type) {
    case 'SET_APP_CONSTANTS_ACTION': {
      return {
        ...state,
        ...actionProps.constants,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export const getConstants = state => state.constants.text;
