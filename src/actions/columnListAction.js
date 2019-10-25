export const loadColumnListSuccessAction = columnList => ({
  type: 'LOAD_COLUMN_LIST_SUCCESS_ACTION',
  columnList,
});

export const loadColumnListFailedAction = errorMessage => ({
  type: 'LOAD_COLUMN_LIST_FAILED_ACTION',
  errorMessage,
});
