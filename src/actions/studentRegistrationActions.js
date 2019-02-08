
export const checkValidUserInfo = (errorMessageObject) => ({
  type: 'CHECK_FOR_VALID_USER_INFO',
  errorMessageObject,
});

export const createStudentData = student => ({
  type: 'CREATE_STUDENT',
  student,
});

export const setStudentCredentials = (id, secretKey) => ({
  type: 'SET_STUDENT_CREDENTIALS',
  id,
  secretKey,
});

export const createStudentSuccessAction = newStudent => ({
  type: 'CREATE_STUDENT_SUCCESS',
  newStudent,
});

export const createStudentFailedAction = message => ({
  type: 'CREATE_STUDENT_FAILED',
  message,
});

export const fetchStudentData = (id, secretKey) => ({
  type: 'FETCH_STUDENT',
  id,
  secretKey
});

export const fetchStudentSuccessAction = student => ({
  type: 'FETCH_STUDENT_SUCCESS',
  student,
});

export const fetchStudentFailedAction = message => ({
  type: 'FETCH_STUDENT_FAILED',
  message,
});

export const updateStudentData = (id, secretKey, updatedStudent) => ({
  type: 'UPDATE_STUDENT',
  id,
  secretKey,
  updatedStudent,
});

export const updateStudentSuccessAction = student => ({
  type: 'UPDATE_STUDENT_SUCCESS',
  student,
});

export const updateStudentFailedAction = message => ({
  type: 'UPDATE_STUDENT_FAILED',
  message,
});

export const setAdminCredentialsAction = (id, password) => ({
  type: 'SET_ADMIN_CREDENTIALS',
  id,
  password
});
export const resetAdminCredentialsAction = () => ({
  type: 'RESET_ADMIN_CREDENTIALS',
  id: '',
  password: '',
});

export const fetchSearchResultsAction = (adminKey, searchKey, searchValue) => ({
  type: 'FETCH_SEARCH_RESULTS',
  adminKey,
  searchKey,
  searchValue,
});

export const fetchSearchResultsSuccessAction = searchResults => ({
  type: 'FETCH_SEARCH_RESULTS_SUCCESS',
  searchResults,
});

export const fetchSearchResultsFailureAction = errorMessage => ({
  type: 'FETCH_SEARCH_RESULTS_FAILURE',
  errorMessage,
});

export const clearSearchResultsAction = () => ({
  type: 'CLEAR_SEARCH_RESULTS',
});

export const setNoRecordsFoundMessageAction = message => ({
  type: 'SET_NO_RECORDS_FOUND_MESSAGE',
  message,
});
export const getAllStudentsAction = ({ secretKey }) => ({
  type: 'GET_ALL_STUDENTS',
  secretKey,
});
export const getAllStudentsDataResultsSuccessAction = (students) =>({
  type: 'GET_ALL_STUDENTS_RESULTS_SUCCESS',
  students,
});
export const getAllStudentsDataResultsFailureAction = (errorMessage) => ({
  type: 'GET_ALL_STUDENTS_RESULTS_FAILURE',
  errorMessage,
});
export const setRedirectValueAction = (redirect) => ({
  type: 'SET_REDIRECT_VALUE',
  redirect,
});
export const setAdminLoginStateAction = (adminLoginState) => {
  return ({
  type: 'SET_ADMIN_LOGIN_STATE',
  adminLoginState,
})
};
export const setStudentDataAction = (student) => ({
  type: 'SET_STUDENT_DATA',
  student,
  isFetched: true,
});
export const updateStudentByAdminAction = (id, secretKey) => ({
  type: 'UPDATE_STUDENT_BY_ADMIN',
  id,
  secretKey,
});
export const isUpdatedResetAction = ()=>({
  type: 'RESET_IS_UPDATE',
  isUpdated: false,
  id: '',
  secretKey: '',
  student: '',
});
export const setVisibleColumnConfigAction = (visibleColumnConfig, selectValue) => ({
  type: 'SET_VISIBLE_COLUMN_CONFIG_DATA',
  visibleColumnConfig,
  selectValue,
});

export const resetVisibleColumnConfigAction = () => ({
  type: 'RESET_VISIBLE_COLUMN_CONFIG_DATA',
});

export const uploadStudentsAttendanceFileAction = (secretKey, attendanceFile) => ({
  type: 'UPLOAD_ATTENDANCE_FILE',
  secretKey,
  attendanceFile,
});

export const uploadAttendanceFileResultsSuccessAction = response => {
  return ({
    type: 'UPLOAD_ATTENDANCE_FILE_SUCCESS',
    failRecordIds: response.failRecordIds,
  });
};

export const uploadAttendanceFileResultsFailureAction = message => ({
  type: 'UPLOAD_ATTENDANCE_FILE_FAILED',
  message,
});

export const resetIsSuccessAction = () => ({
  type: 'RESET_IS_SUCCESS',
});

export const uploadOptInFileAction = (secretKey, optInFile) => ({
  type: 'UPLOAD_OPT_IN_FILE',
  secretKey,
  optInFile,
});

export const uploadOptInFileResultsSuccessAction = response => ({
    type: 'UPLOAD_OPT_IN_FILE_SUCCESS',
    failRecordIds: response.failRecordIds,
  });

export const uploadOptInFileResultsFailureAction = message => ({
  type: 'UPLOAD_OPT_IN_FILE_FAILED',
  message,
});

export const resetIsOptInSuccessAction = () => ({
  type: 'RESET_IS_OPT_IN_SUCCESS',
});

export const markSelectedStudentsAttendanceAction = (secretKey, selectedStudentsId, day) => ({
  type: 'MARK_SELECTED_STUDENTS_ATTENDANCE',
  secretKey,
  selectedStudentsId,
  day,
});

export const markSelectedStudentsAttendanceResultsSuccessAction = response => ({
  type: 'MARK_SELECTED_STUDENTS_ATTENDANCE_SUCCESS',
});

export const markSelectedStudentsAttendanceResultsFailureAction = message => ({
  type: 'MARK_SELECTED_STUDENTS_ATTENDANCE_FAILED',
  message,
});

export const resetIsMarkAttendanceSuccessAction = () => ({
  type: 'RESET_IS_MARK_ATTENDANCE_SUCCESS',
});

export const markSelectedStudentsOptInOrOptOutAction = (secretKey, selectedStudentsId, opt) => ({
  type: 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT',
  secretKey,
  selectedStudentsId,
  opt,
});

export const markSelectedStudentsOptInOrOptOutResultsSuccessAction = response => ({
  type: 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT_SUCCESS',
});

export const markSelectedStudentsOptInOrOptOutResultsFailureAction = message => ({
  type: 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT_FAILED',
  message,
});

export const resetIsMarkOptInOrOptOutSuccessAction = () => ({
  type: 'RESET_IS_MARK_OPT_IN_OR_OPT_OUT_SUCCESS',
});

export const updateIdCardStatusSelectedStudentsAction = (secretKey, selectedStudentsId, IdCardStatus) => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS',
  secretKey,
  selectedStudentsId,
  IdCardStatus,
});

export const updateIdCardStatusSelectedStudentsResultsSuccessAction = response => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS_SUCCESS',
});

export const updateIdCardStatusSelectedStudentsResultsFailureAction = message => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS_FAILED',
  message,
});

export const resetIsUpdateIdCardStatusSuccessAction = () => ({
  type: 'RESET_IS_UPDATE_ID_CARD_STATUS_SUCCESS',
});

export const setHashLinkForStudentCredentialAction = (hashLink) => ({
  type: 'SET_HASH_LINK_FOR_STUDENT_CREDENTIAL',
  hashLink,
});

export const setHashLinkForNewRegistrationAction = (userType) => ({
  type: 'SET_HASH_LINK_FOR_NEW_REGISTRATION',
  userType,
});

export const parentsRegistrationAction = (name, members, phoneNumber) => ({
  type: 'PARENTS_REGISTRATION',
  name,
  members,
  phoneNumber,
});

export const parentsRegistrationResultsSuccessAction = response => ({
  type: 'PARENTS_REGISTRATION_RESULT_SUCCESS',
  response,
});

export const parentsRegistrationResultsFailureAction = message => ({
  type: 'PARENTS_REGISTRATION_RESULT_FAILED',
  message,
});