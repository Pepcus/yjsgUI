const initialStateOfLoader = {
  isLoading: false,
};

export const loaderReducer = (state = initialStateOfLoader, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getLoaderState = state => state.loaderReducer.isLoading;
