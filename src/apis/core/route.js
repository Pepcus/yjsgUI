import { GET } from 'apis/http';

export const getRouteConfig = (tenant, configName) => GET({
  url: `ui_config/tenant/${tenant}/routes/${configName}.json`,
}).then(response => response).catch((error) => {
  console.error(`Error occurred while fetching ${configName} config for ${tenant} tenant - `, error);
  return {};
});
