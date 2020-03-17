
export const getUpdatedAppConfig = (appConfig) => {
  if (window.location.hash === '#/gms'
    || window.location.hash === '#/user-registration') {
    appConfig.tenant = 'GMS';
    return appConfig;
  }
  return appConfig;
};
