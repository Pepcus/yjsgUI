const initialState = {
  columnList: [],
  errorMessage: '',
};

export const columnListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_COLUMN_LIST_SUCCESS_ACTION':
      return {
        ...state,
        columnList: action.columnList,
        errorMessage: '',
      };
    case 'LOAD_COLUMN_LIST_FAILED_ACTION':
      return {
        ...state,
        columnList: [],
        errorMessage: action.errorMessage,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getColumnList = state => state.columnListReducer.columnList;
