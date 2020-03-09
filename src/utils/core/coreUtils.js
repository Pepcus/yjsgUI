
export const getUpdatedAppConfig = (appConfig) => {
  if (window.location.hash === '#/gms') {
    appConfig.tenant = 'GMS';
    return appConfig;
  }
  return appConfig;
};
