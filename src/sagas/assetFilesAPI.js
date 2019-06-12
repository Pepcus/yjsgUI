import { GET } from '../utils/http';

/**
 * fetchFile method fetch file data
 * @param {Object} fileDetails
 * @return {Promise}
 */
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

/**
 * fetchFileConfig fetch filesConfig json file
 * @return {Promise}
 */
export const fetchFileConfig = () => (
  GET({
    url: 'files/filesConfig.json',
  })
);

/**
 * getAppConfig fetch app json file
 * @return {Promise}
 */
export const getAppConfig = () => (
  GET({
    url: 'ui_config/app.json',
  })
);

/**
 * getBusCoordinatorsConfig fetch busCoordinatorsConfig json file
 * @return {Promise}
 */
export const getBusCoordinatorsConfig = () => (
  GET({
    url: 'ui_config/busCoordinators.json',
  })
);
