export const loadConstantsConfigSuccessAction = finalConstantsConfig => ({
  type: 'LOAD_CONSTANTS_CONFIG_SUCCESS_ACTION',
  appConstants: finalConstantsConfig,
});

export const loadConstantsConfigFailedAction = errorMessage => ({
  type: 'LOAD_CONSTANTS_CONFIG_FAILED_ACTION',
  errorMessage,
});
