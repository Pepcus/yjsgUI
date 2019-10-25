export const loadLogoPathConfigSuccessAction = logoPathConfig => ({
  type: 'LOAD_LOGO_PATH_CONFIG_SUCCESS_ACTION',
  logoPathConfig,
});

export const loadLogoPathConfigFailedAction = errorMessage => ({
  type: 'LOAD_LOGO_PATH_CONFIG_FAILED_ACTION',
  errorMessage,
});
