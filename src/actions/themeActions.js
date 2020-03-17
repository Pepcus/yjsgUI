export const loadAppThemeSuccessAction = appTheme => ({
  type: 'LOAD_APP_THEME_SUCCESS_ACTION',
  appTheme,
});

export const loadAppThemeFailedAction = () => ({
  type: 'LOAD_APP_THEME_FAILED_ACTION',
});
