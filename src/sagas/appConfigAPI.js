import { GET } from '../utils/http';

/**
 * getAppConfig fetch app json file
 * @return {Promise}
 */
export const getAppConfig = () => (
  GET({
    url: 'ui_config/app.json',
  })
);
