import { GET } from 'apis/http';

/**
 * FETCH App configuration
 *
 * @param   {String}  tenant
 * @return  {Promise}
 */
export const fetchAppConfig = ({ tenant }) => GET({
  url: `ui_config/tenant/${tenant}/app.json`,
});

export const getAppConfig = () => (
  GET({
    url: 'ui_config/app.json',
  })
);

export const getBusCoordinatorsConfig = () => (
  GET({
    url: 'ui_config/busCoordinators.json',
  })
);

export const getAppTheme = ({ tenant }) => (
  GET({
    url: `ui_config/tenant/${tenant}/theme.json`,
  }));

export const getAppConstants = ({ tenant }) => (
  GET({
    url: `ui_config/tenant/${tenant}/constants/text.json`,
  })
);

export const getAPIConfig = ({ tenant }) => GET({
  url: `ui_config/tenant/${tenant}/api/api.json`,
});
