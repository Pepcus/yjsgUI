const initialState = {
  appTheme: {},
  hasAppTheme: false,
};

export const theme = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'LOAD_APP_THEME_SUCCESS_ACTION': {
      return {
        ...state,
        hasAppTheme: true,
        appTheme: { ...action.appTheme },
      };
    }
    case 'LOAD_APP_THEME_FAILED_ACTION': {
      return {
        ...state,
        appTheme: {},
        hasAppTheme: false,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getAppTheme = state => state.theme.appTheme;
