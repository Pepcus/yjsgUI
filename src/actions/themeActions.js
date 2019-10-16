export const loadedAppThemeSuccessAction = appTheme => ({
  type: 'LOADED_APP_THEME_SUCCESS_ACTION',
  appTheme,
});

export const loadAppThemeFailedAction = () => ({
  type: 'LOADED_APP_THEME_FAILED_ACTION',
});
