import moment from 'moment';

/**
 * gridHeaderData return student grid header data.
 * @type {ReactFunctionalComponent}
 * @return {{drawerPosition: string,
 *  includeGlobalFilter: boolean,
 *  includeAllInGlobalFilter: boolean,
 *  enableRowSelection: boolean,
 *  bottomDrawer: {
 *   exportButton: boolean,
 *   totalRecords: boolean,
 *   pagination: boolean,
 *   clearButton: boolean,
 *   globalSearch: boolean
 *   },
 *  headerConfig: Array,
 *  topDrawer: {
 *   exportButton: boolean,
 *   totalRecords: boolean,
 *   pagination: boolean,
 *   clearButton: boolean,
 *   globalSearch: boolean
 *   },
 *  recordsPerPage: number,
 *  enableAllRowSelection: boolean
 *  }
 *  }
 */
export const gridHeaderData = ({ color, gridMetaData }) => ({
  headerConfig: gridMetaData,
  topDrawer: {
    'pagination': false,
    'globalSearch': false,
    'clearButton': true,
    'exportButton': true,
    'totalRecords': false,
  },
  bottomDrawer: {
    'pagination': true,
    'globalSearch': false,
    'clearButton': false,
    'exportButton': false,
    'totalRecords': true,
  },
  enableRowSelection: true,
  enableAllRowSelection: true,
  recordsPerPage: 25,
  drawerPosition: 'top',
  includeAllInGlobalFilter: false,
  includeGlobalFilter: true,
  exportFileName: `StudentData-${moment().format('DD-MM-YYYY-LT')}.csv`,
  loaderColor: color,
  resizeColumnWidth: true,
});

export const getStyles = () => ({
  gridWrapper: {
    'width': 'auto',
  },
});
