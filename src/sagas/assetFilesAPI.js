import { GET } from '../utils/http';

export const fetchFile = (fileDetails) => {
  let responseType = 'json';
  if (fileDetails.fileType === 'xlsx' || fileDetails.fileType === 'xls') {
    responseType = 'arrayBuffer';
  }
  if (fileDetails.fileType === 'csv') {
    responseType = 'text';
  }
  return (
    GET({
      url: `files/${fileDetails.fileName}.${fileDetails.fileType}`,
      headers: {
      },
      responseType,
    }));
};

export const fetchFileConfig = () => (
  GET({
    url: 'files/filesConfig.json',
  })
);

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
