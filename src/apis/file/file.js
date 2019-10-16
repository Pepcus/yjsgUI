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

// TODO by Pratik : Add download file API
