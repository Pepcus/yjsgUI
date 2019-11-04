export const loadGridMetaDataSuccessAction = gridMetaData => ({
  type: 'LOAD_GRID_META_DATA_SUCCESS_ACTION',
  gridMetaData,
});

export const loadGridMetaDataFailedAction = errorMessage => ({
  type: 'LOAD_GRID_META_DATA_FAILED_ACTION',
  errorMessage,
});
