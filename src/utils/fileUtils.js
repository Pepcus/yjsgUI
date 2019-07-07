import * as XLSX from 'xlsx';
import { FILE_PRESENTATION_TYPE } from '../constants/yjsg';

/**
 * formatXlsxToJson method format response of xlsx file type json type.
 * @param {Object} response
 * @return {any[]}
 */
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

/**
 * getDataGridHeadersForFileView method return the metaData for file according to
 * file presentation type
 * @param {Array} fileData
 * @param {Object} fileDetails
 * @return {{drawerPosition: string,
 * bottomDrawer: {pagination: boolean},
 * headerConfig: Array,
 * recordsPerPage: number}} metaData
 */
export const getDataGridHeadersForFileView = (fileData, fileDetails) => {

  const { NORMAL_TABULAR, COMPLEX_GRID } = FILE_PRESENTATION_TYPE;
  const headerConfig = [];

  for (const key in fileData[0]) {
    headerConfig.push({
      label: key,
      key,
      'type': 'string',
    });
  }

  let metaData = {
    headerConfig,
    recordsPerPage: 100,
    bottomDrawer: {
      'pagination': true,
    },
    drawerPosition: 'top',
  };

  if (fileDetails.presentationType) {
    if (fileDetails.presentationType === NORMAL_TABULAR) {

      const normalHeader = [];

      for (const key in fileData[0]) {
        normalHeader.push({
          key,
          'disableFilter': true,
        });
      }

      metaData = {
        headerConfig: normalHeader,
      };

    } else if (fileDetails.presentationType === COMPLEX_GRID) {

      const complexHeader = [];

      for (const key in fileData[0]) {
        complexHeader.push({
          label: key,
          key,
          'type': 'string',
        });
      }

      metaData = {
        headerConfig: complexHeader,
        recordsPerPage: 100,
        bottomDrawer: {
          'pagination': true,
          'globalSearch': false,
          'clearButton': false,
          'exportButton': false,
          'totalRecords': true,
        },
        drawerPosition: 'top',
      };
    }
  }
  return metaData;
};
