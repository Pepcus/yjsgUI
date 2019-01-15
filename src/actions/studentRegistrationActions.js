export const checkValidUserInfo = (errorMessageObject) => ({
  type: 'CHECK_FOR_VALID_USER_INFO',
  errorMessageObject,
});

export const createStudentData = student => ({
  type: 'CREATE_STUDENT',
  student
});

export const setStudentCredentials = (id, secretKey) => ({
  type: 'SET_STUDENT_CREDENTIALS',
  id,
  secretKey,
});

export const createStudentSuccessAction = newStudent => ({
  type: 'CREATE_STUDENT_SUCCESS_ACTION',
  newStudent,
});

export const createStudentFailedAction = message => ({
  type: 'CREATE_STUDENT_FAILED_ACTION',
  message,
});

export const fetchStudentData = (id, secretKey) => ({
  type: 'FETCH_STUDENT',
  id,
  secretKey
});

export const fetchStudentSuccessAction = student => ({
  type: 'FETCH_STUDENT_SUCCESS_ACTION',
  student,
});

export const fetchStudentFailedAction = message => ({
  type: 'FETCH_STUDENT_FAILED_ACTION',
  message,
});

export const updateStudentData = (id, secretKey, updatedStudent) => ({
  type: 'UPDATE_STUDENT',
  id,
  secretKey,
  updatedStudent,
});

export const updateStudentSuccessAction = student => ({
  type: 'UPDATE_STUDENT_SUCCESS_ACTION',
  student,
});

export const updateStudentFailedAction = message => ({
  type: 'UPDATE_STUDENT_FAILED_ACTION',
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
export const getAllStudentsAction = () => ({
  type: 'GET_ALL_STUDENTS',
});
export const getAllStudentsDataResultsSuccessAction = (students) =>({
  type: 'GET_ALL_STUDENTS_RESULTS_SUCCESS',
  students,
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

