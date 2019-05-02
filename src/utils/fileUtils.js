import * as XLSX from 'xlsx';
import { FILE_PRESENTATION_TYPE } from '../appConstance/yjsgConstants';

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
    if (fileDetails.presentationType === FILE_PRESENTATION_TYPE.NORMAL_TABULAR) {
      let normalHeader = [];
      for (const key in fileData[0]) {
        normalHeader.push({
          key,
          'disableFilter': true,
        });
      }
      metaData = {
        headerConfig: normalHeader,
      };
    } else if (fileDetails.presentationType === FILE_PRESENTATION_TYPE.COMPLEX_GRID) {
      let complexHeader = [];
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
