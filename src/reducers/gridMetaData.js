const initialState = {
  gridMetaData: [],
  errorMessage: '',
};

export const gridMetaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_GRID_META_DATA_SUCCESS_ACTION':
      return {
        ...state,
        gridMetaData: action.gridMetaData,
        errorMessage: '',
      };
    case 'LOAD_GRID_META_DATA_FAILED_ACTION':
      return {
        ...state,
        gridMetaData: [],
        errorMessage: action.errorMessage,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getGridMetaData = state => state.gridMetaDataReducer.gridMetaData;
