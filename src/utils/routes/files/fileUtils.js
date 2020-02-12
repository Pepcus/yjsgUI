import * as XLSX from 'xlsx';
import { FILE_PRESENTATION_TYPE } from 'constants/file';

export const formatXlsxToJson = (response) => {
  const data = new Uint8Array(response);
  const xlsxData = [];
  data.forEach((dataObj) => {
    xlsxData.push(String.fromCharCode(dataObj));
  });
  const updatedXlsxData = xlsxData.join('');
  const workbook = XLSX.read(updatedXlsxData, {
    type: 'binary',
  });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  return XLSX.utils.sheet_to_json(worksheet, {
    raw: true,
    defval: '',
  });
};

export const getDataGridHeadersForFileView = (fileData, fileDetails) => {
  const headerConfig = [];
  for (const key in fileData[0]) {
    if (key !== 'gridId') {
      headerConfig.push({
        label: key,
        key,
        'type': 'string',
      });
    }
  }
  let metaData = {
    headerConfig,
    recordsPerPage: 100,
    bottomDrawer: {
      'pagination': true,
    },
    drawerPosition: 'top',
    resizeColumnWidth: true,
  };
  if (fileDetails.presentationType) {
    if (fileDetails.presentationType === FILE_PRESENTATION_TYPE.NORMAL_TABULAR) {
      let normalHeader = [];
      for (const key in fileData[0]) {
        if (key !== 'gridId') {
          normalHeader.push({
            key,
            'disableFilter': true,
          });
        }
      }
      metaData = {
        headerConfig: normalHeader,
      };
    } else if (fileDetails.presentationType === FILE_PRESENTATION_TYPE.COMPLEX_GRID) {
      let complexHeader = [];
      for (const key in fileData[0]) {
        if (key !== 'gridId') {
          complexHeader.push({
            label: key,
            key,
            'type': 'string',
          });
        }
      }
      metaData = {
        headerConfig: complexHeader,
        recordsPerPage: 150,
        bottomDrawer: {
          'pagination': true,
          'globalSearch': false,
          'clearButton': false,
          'exportButton': false,
          'totalRecords': true,
        },
        drawerPosition: 'top',
        resizeColumnWidth: true,
      };
    }
  }
  return metaData;
};

/**
 * It return flag value for file list display condition
 * @param {Number} width
 * @param {Boolean} showFileDetails
 * @param {Boolean} backPageButton
 * @return {boolean}
 */
export const getFileListDisplayCondition = ({ width, showFileDetails, backPageButton }) => {
  const isMobile = width <= 600;
  if (showFileDetails) {
    if (isMobile) {
      if (backPageButton) {
        return true;
      }
      return false;
    }
    return true;
  }
  return true;
};

/**
 * It return flag value for message display condition
 * @param {Number} width
 * @param {Boolean} showFileDetails
 * @param {Boolean} backPageButton
 * @return {boolean}
 */
export const getMessageDisplayCondition = ({ width, showFileDetails, backPageButton }) => {
  const isMobile = width <= 600;
  if (showFileDetails) {
    if (isMobile) {
      if (backPageButton) {
        return false;
      }
      return true;

    }
    return true;
  }
  return true;
};

export const fetchFileResponseType = (fileDetails) => {
  let responseType = 'json';
  if (fileDetails.fileType === 'xlsx' || fileDetails.fileType === 'xls') {
    responseType = 'arrayBuffer';
  }
  if (fileDetails.fileType === 'csv') {
    responseType = 'text';
  }
  return responseType;
};
