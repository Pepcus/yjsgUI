/**
 * gridData is student grid columns heading data.
 * @type {Array}
 */
export const gridMetaData = [
  {
    'label': 'Edit',
    'key': 'edit',
    'disableFilter': true,
    'excludeFromExport': true,
  },
  {
    'label': 'ID',
    'key': 'studentId',
    'type': 'Number',
  },
  {
    'label': 'Name',
    'key': 'name',
    'type': 'string',
  },
  {
    'label': 'Father Name',
    'key': 'fatherName',
    'type': 'string',
  },
  {
    'label': 'Gender',
    'key': 'gender',
    'type': 'string',
  },
  {
    'label': 'Age',
    'key': 'age',
    'type': 'Number',
  },
  {
    'label': 'Education',
    'key': 'education',
    'type': 'string',
  },
  {
    'label': 'Occupation',
    'key': 'occupation',
    'type': 'string',
  },
  {
    'label': 'Mother Mobile No.',
    'key': 'motherMobile',
    'type': 'Number',
  },
  {
    'label': 'Mobile',
    'key': 'mobile',
    'type': 'Number',
  },
  {
    'label': 'Email',
    'key': 'email',
    'type': 'string',
  },
  {
    'label': 'Address',
    'key': 'address',
    'type': 'string',
  },
  {
    'label': 'Bus Number',
    'key': 'busNumber',
    'type': 'string',
  },
  {
    'label': 'Bus Stop',
    'key': 'busStop',
    'type': 'string',
  },
  {
    'label': 'Print Status',
    'key': 'printStatus',
    'type': 'string',
  },
  {
    'label': 'Remark',
    'key': 'remark',
    'type': 'string',
  },
  {
    'label': 'Secret Key',
    'key': 'secretKey',
    'type': 'string',
  },
  {
    'label': '2016 Class Attended',
    'key': 'classAttended2016',
    'type': 'string',
  },
  {
    'label': '2017 Class Attended',
    'key': 'classAttended2017',
    'type': 'string',
  },
  {
    'label': '2018 Class Attended',
    'key': 'classAttended2018',
    'type': 'string',
  },
  {
    'label': '2019 Class Attended',
    'key': 'classAttended2019',
    'type': 'string',
  },
  {
    'label': '2016 Class Room No.',
    'key': 'classRoomNo2016',
    'type': 'Number',
  },
  {
    'label': '2017 Class Room No.',
    'key': 'classRoomNo2017',
    'type': 'Number',
  },
  {
    'label': '2018 Class Room No.',
    'key': 'classRoomNo2018',
    'type': 'Number',
  },
  {
    'label': '2019 Class Room No.',
    'key': 'classRoomNo2019',
    'type': 'Number',
  },
  {
    'label': '2016 Attendance',
    'key': 'attendance2016',
    'type': 'Number',
  },
  {
    'label': '2017 Attendance',
    'key': 'attendance2017',
    'type': 'Number',
  },
  {
    'label': '2018 Attendance',
    'key': 'attendance2018',
    'type': 'Number',
  },
  {
    'label': '2019 Attendance',
    'key': 'attendance2019',
    'type': 'Number',
  },
  {
    'label': '2016 Marks',
    'key': 'marks2016',
    'type': 'Number',
  },
  {
    'label': '2017 Marks',
    'key': 'marks2017',
    'type': 'Number',
  },
  {
    'label': '2018 Marks',
    'key': 'marks2018',
    'type': 'Number',
  },
  {
    'label': '2019 Marks',
    'key': 'marks2019',
    'type': 'Number',
  },
  {
    'label': '2018 Opt In',
    'key': 'optIn2018',
    'type': 'string',
  },
  {
    'label': '2019 Opt In',
    'key': 'optIn2019',
    'type': 'string',
  },
  {
    'label': 'Day 1',
    'key': 'day1',
    'type': 'string',
  },
  {
    'label': 'Day 2',
    'key': 'day2',
    'type': 'string',
  },
  {
    'label': 'Day 3',
    'key': 'day3',
    'type': 'string',
  },
  {
    'label': 'Day 4',
    'key': 'day4',
    'type': 'string',
  },
  {
    'label': 'Day 5',
    'key': 'day5',
    'type': 'string',
  },
  {
    'label': 'Day 6',
    'key': 'day6',
    'type': 'string',
  },
  {
    'label': 'Day 7',
    'key': 'day7',
    'type': 'string',
  },
  {
    'label': 'Day 8',
    'key': 'day8',
    'type': 'string',
  },
  {
    'label': 'Created Date',
    'key': 'createdDate',
    'type': 'string',
  },
  {
    'label': 'Last Modified Date',
    'key': 'lastModifiedDate',
    'type': 'string',
  },
];

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
export const gridHeaderData = () => ({
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
});

export const getStyles = () => ({
  gridWrapper: {
    'width': 'auto',
  },
});