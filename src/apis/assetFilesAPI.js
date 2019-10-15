import { GET } from 'apis/http';

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
