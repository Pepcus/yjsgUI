import { GET } from 'apis/http';

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

/**
 * fetchFormConfig method fetch file data
 * @param {Object} fileDetails
 * @return {Promise}
 */
export const fetchFormConfig = ({ tenant, fileName }) => (
  GET({
    url: `src/config/tenant/${tenant}/${fileName}.json`,
  }));

// TODO by Pratik : Add download file API
