export const checkValidUserInfo = (errorMessageObject) => ({
  type: 'CHECK_FOR_VALID_USER_INFO',
  errorMessageObject,
});
/**
 * createStudentDataAction action will call when new student will create.
 * @param {Object} student
 * @return {{student: Object, type: string}}
 */
export const createStudentData = student => ({
  type: 'CREATE_STUDENT',
  student,
});
/**
 * setStudentCredentialsAction call when new student is created,
 * or already student login with their credential.
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: String, id: String, type: string}}
 */
export const setStudentCredentials = (id, secretKey) => ({
  type: 'SET_STUDENT_CREDENTIALS',
  id,
  secretKey,
});
/**
 * createStudentSuccessAction action will call when
 * create student AIP response is success
 * @param {Object} newStudent
 * @return {{newStudent: {Object}, type: string}}
 */
export const createStudentSuccessAction = newStudent => ({
  type: 'CREATE_STUDENT_SUCCESS',
  newStudent,
});
/**
 * createStudentFailedAction action will call when
 * create student AIP response is fail
 * @param {String} message
 * @return {{type: string, message: {String}}}
 */
export const createStudentFailedAction = message => ({
  type: 'CREATE_STUDENT_FAILED',
  message,
});
/**
 * fetchStudentDataAction action will call when
 * student data will fetched
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: *, id: *, type: string}}
 */
export const fetchStudentData = (id, secretKey) => ({
  type: 'FETCH_STUDENT',
  id,
  secretKey,
});
/**
 * fetchStudentSuccessAction action will call when
 * fetch student data AIP response is success
 * @param {Object} student
 * @return {{student: {Object}, type: string}}
 */
export const fetchStudentSuccessAction = student => ({
  type: 'FETCH_STUDENT_SUCCESS',
  student,
});
/**
 * fetchStudentFailedAction action will call when
 * fetch student data AIP response is fail
 * @param {String} message
 * @return {{type: string, message: String}}
 */
export const fetchStudentFailedAction = message => ({
  type: 'FETCH_STUDENT_FAILED',
  message,
});
/**
 * updateStudentDataAction action will call when student data will updated.
 * @param {String} id
 * @param {String} secretKey
 * @param {Object} updatedStudent
 * @return {{updatedStudent: {Object}, secretKey: {String}, id: {String}, type: string}}
 */
export const updateStudentData = ({ id, secretKey, student }) => ({
    type: 'UPDATE_STUDENT',
    id,
    secretKey,
    student,
  });
/**
 * updateStudentSuccessAction action will call when
 * update student data AIP response is success
 * @param {Object} student
 * @return {{student: {Object}, type: string}}
 */
export const updateStudentSuccessAction = student => ({
  type: 'UPDATE_STUDENT_SUCCESS',
  student,
});
/**
 * updateStudentFailedAction action will call when
 * update student data AIP response is fail
 * @param {String} message
 * @return {{type: string, message: {String}}}
 */
export const updateStudentFailedAction = message => ({
  type: 'UPDATE_STUDENT_FAILED',
  message,
});
/**
 * setAdminCredentialsAction action will call
 * when admin login with their credential
 * @param {String} id
 * @param {String} password
 * @return {{password: *, id: *, type: string}}
 */
export const setAdminCredentialsAction = (id, password) => ({
  type: 'SET_ADMIN_CREDENTIALS',
  id,
  password,
});
/**
 * resetAdminCredentialsAction action will call
 * when admin logout.
 * @return {{password: string, id: string, type: string}}
 */
export const resetAdminCredentialsAction = () => ({
  type: 'RESET_ADMIN_CREDENTIALS',
  id: '',
  password: '',
});
/**
 * fetchSearchResultsAction action fetch the student data according the searchValue
 * @param {String} adminKey
 * @param {String} searchKey
 * @param {String} searchValue
 * @return {{searchKey: {String}, type: string, adminKey: {String}, searchValue: {String}}}
 */
export const fetchSearchResultsAction = ({ adminKey, searchKey, searchValue }) => ({
  type: 'FETCH_SEARCH_RESULTS',
  adminKey,
  searchKey,
  searchValue,
});
/**
 * fetchSearchResultsSuccessAction action will call when fetch search result is success
 * @param {Array} searchResults
 * @return {{type: string, searchResults: {Array}}}
 */
export const fetchSearchResultsSuccessAction = searchResults => ({
  type: 'FETCH_SEARCH_RESULTS_SUCCESS',
  searchResults,
});
/**
 * fetchSearchResultsFailureAction action will call
 * when fetch search result API responds is fail
 * @param {String} errorMessage
 * @return {{errorMessage: *, type: string}}
 */
export const fetchSearchResultsFailureAction = errorMessage => ({
  type: 'FETCH_SEARCH_RESULTS_FAILURE',
  errorMessage,
});
/**
 * clearSearchResultsAction action will call
 * when click on click on clear button of search
 * @return {{type: string}}
 */
export const clearSearchResultsAction = () => ({
  type: 'CLEAR_SEARCH_RESULTS',
});
/**
 * setNoRecordsFoundMessageAction action will call when search result is empty
 * @param {String} message
 * @return {{type: string, message: *}}
 */
export const setNoRecordsFoundMessageAction = message => ({
  type: 'SET_NO_RECORDS_FOUND_MESSAGE',
  message,
});
/**
 * getAllStudentsAction action will call when all students data will fetch.
 * @param {String} secretKey
 * @return {{secretKey: {String}, type: string}}
 */
export const getAllStudentsAction = ({ secretKey }) => ({
  type: 'GET_ALL_STUDENTS',
  secretKey,
});
/**
 * getAllStudentsDataResultsSuccessAction action will call
 * when fetch all students data API responds is success.
 * @param {Array} students
 * @return {{students: *, type: string}}
 */
export const getAllStudentsDataResultsSuccessAction = students => ({
  type: 'GET_ALL_STUDENTS_RESULTS_SUCCESS',
  students,
});
/**
 * getAllStudentsDataResultsFailureAction action will call
 * when fetch all students data API responds is fail.
 * @param {String} errorMessage
 * @return {{errorMessage: *, type: string}}
 */
export const getAllStudentsDataResultsFailureAction = errorMessage => ({
  type: 'GET_ALL_STUDENTS_RESULTS_FAILURE',
  errorMessage,
});
/**
 * setRedirectValueAction action will call when admin is login
 * or admin is logout
 * @param {Boolean} redirect
 * @return {{redirect: {Boolean}, type: string}}
 */
export const setRedirectValueAction = redirect => ({
  type: 'SET_REDIRECT_VALUE',
  redirect,
});
/**
 * setAdminLoginStateAction action will call when admin is login
 * or logout
 * @param {Boolean} adminLoginState
 * @return {{adminLoginState: {Boolean}, type: string}}
 */
export const setAdminLoginStateAction = adminLoginState => ({
  type: 'SET_ADMIN_LOGIN_STATE',
  adminLoginState,
});
/**
 * setStudentDataAction action will call when click on edit button of particular row
 * in students grid
 * @param {Object} student
 * @return {{student: {Object}, isFetched: boolean, type: string}}
 */
export const setStudentDataAction = student => ({
  type: 'SET_STUDENT_DATA',
  student,
  isFetched: true,
});
/**
 * updateStudentByAdminAction action will call
 * when student data will update by admin
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: {String}, id: {String}, type: string}}
 */
export const updateStudentByAdminAction = (id, secretKey) => ({
  type: 'UPDATE_STUDENT_BY_ADMIN',
  id,
  secretKey,
});
/**
 * isUpdatedResetAction action will call when reset the update information form store
 * @return {{secretKey: string, student: string, isUpdated: boolean, id: string, type: string}}
 */
export const isUpdatedResetAction = () => ({
  type: 'RESET_IS_UPDATE',
  isUpdated: false,
  id: '',
  secretKey: '',
  student: '',
});
/**
 * setVisibleColumnConfigAction action will
 * call when set the updated column option data in store
 * @param {Object} visibleColumnConfig
 * @param {Boolean} selectValue
 * @return {{visibleColumnConfig: {Object}, selectValue: {Boolean}, type: string}}
 */
export const setVisibleColumnConfigAction = (visibleColumnConfig, selectValue) => ({
  type: 'SET_VISIBLE_COLUMN_CONFIG_DATA',
  visibleColumnConfig,
  selectValue,
});
/**
 * resetVisibleColumnConfigAction action will set the column option to initial state in store
 * on logout of admin
 * @return {{type: string}}
 */
export const resetVisibleColumnConfigAction = () => ({
  type: 'RESET_VISIBLE_COLUMN_CONFIG_DATA',
});
/**
 * uploadStudentsAttendanceFileAction action will call when upload student attendance file
 * @param {String} secretKey
 * @param {Object} attendanceFile
 * @param {String} day
 * @return {{secretKey: {String}, type: string, day: {string},  attendanceFile: {Object}}}
 */
export const uploadStudentsAttendanceFileAction = ({ secretKey, attendanceFile, day }) => ({
  type: 'UPLOAD_ATTENDANCE_FILE',
  secretKey,
  attendanceFile,
  day,
});
/**
 * uploadAttendanceFileResultsSuccessAction action will call
 * when upload students attendance file API response is success
 * @param {Object} response
 * @return {{type: string, failRecordIds: null}}
 */
export const uploadAttendanceFileResultsSuccessAction = response => ({
  type: 'UPLOAD_ATTENDANCE_FILE_SUCCESS',
  failRecordIds: response.failRecordIds,
  idNotExist: response.idNotExist,
});
/**
 * uploadAttendanceFileResultsFailureAction action will call when
 * upload students attendance file API response is fail
 * @param {String} message
 * @return {{type: string, message: {String}}}
 */
export const uploadAttendanceFileResultsFailureAction = message => ({
  type: 'UPLOAD_ATTENDANCE_FILE_FAILED',
  message,
});
/**
 * resetIsSuccessAction action will call when reset
 * the isSuccess flag of students attendance file upload
 * @return {{type: string}}
 */
export const resetIsSuccessAction = () => ({
  type: 'RESET_IS_SUCCESS',
});
/**
 * uploadOptInFileAction action will call when upload students optIn file
 * @param {String} secretKey
 * @param {Object} optInFile
 * @return {{secretKey: {String}, optInFile: {String}, type: string}}
 */
export const uploadOptInFileAction = (secretKey, optInFile) => ({
  type: 'UPLOAD_OPT_IN_FILE',
  secretKey,
  optInFile,
});
/**
 * uploadOptInFileResultsSuccessAction action will call
 * when upload students optIn file API respond is success
 * @param {Object} response
 * @return {{type: string, failRecordIds: null}}
 */
export const uploadOptInFileResultsSuccessAction = response => ({
  type: 'UPLOAD_OPT_IN_FILE_SUCCESS',
  failRecordIds: response.failRecordIds,
  idNotExist: response.idNotExist,
});
/**
 * uploadOptInFileResultsFailureAction action will call
 * when upload students optIn file API respond is fail
 * @param {String} message
 * @return {{type: string, message: {String}}}
 */
export const uploadOptInFileResultsFailureAction = message => ({
  type: 'UPLOAD_OPT_IN_FILE_FAILED',
  message,
});
/**
 * resetIsOptInSuccessAction action will call when
 * reset isOptInSuccess flag
 * @return {{type: string}}
 */
export const resetIsOptInSuccessAction = () => ({
  type: 'RESET_IS_OPT_IN_SUCCESS',
});
/**
 * markSelectedStudentsAttendanceAction action will call when mark selected student attendance
 * @param {String} secretKey
 * @param {Array} selectedStudentsId
 * @param {Object} day
 * @return {{secretKey: {String}, type: string, day: {Object}, selectedStudentsId: {Array}}}
 */
export const markSelectedStudentsAttendanceAction = ({ secretKey, selectedStudentsId, day }) => ({
  type: 'MARK_SELECTED_STUDENTS_ATTENDANCE',
  secretKey,
  selectedStudentsId,
  day,
});
/**
 * markSelectedStudentsAttendanceResultsSuccessAction action will call
 * when mark selected students attendance AIP responds is success
 * @param {Object} response
 * @return {{type: string}}
 */
export const markSelectedStudentsAttendanceResultsSuccessAction = response => ({
  type: 'MARK_SELECTED_STUDENTS_ATTENDANCE_SUCCESS',
});
/**
 * markSelectedStudentsAttendanceResultsFailureAction action will call
 * when mark selected students attendance AIP responds is fail
 * @param {String} message
 * @return {{type: string, message: {String}}}
 */
export const markSelectedStudentsAttendanceResultsFailureAction = message => ({
  type: 'MARK_SELECTED_STUDENTS_ATTENDANCE_FAILED',
  message,
});
/**
 * resetIsMarkAttendanceSuccessAction action will call when reset isMarkAttendanceSuccess flag
 * @return {{type: string}}
 */
export const resetIsMarkAttendanceSuccessAction = () => ({
  type: 'RESET_IS_MARK_ATTENDANCE_SUCCESS',
});
/**
 * markSelectedStudentsOptInOrOptOutAction action will call when mark selected student optInOrOptOut
 * @param {String} secretKey
 * @param {Array} selectedStudentsId
 * @param {Object} opt
 * @return {{opt: {Object}, secretKey: {String}, type: string, selectedStudentsId: {Array}}}
 */
export const markSelectedStudentsOptInOrOptOutAction = ({ secretKey, selectedStudentsId, opt }) => ({
  type: 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT',
  secretKey,
  selectedStudentsId,
  opt,
});
/**
 * markSelectedStudentsOptInOrOptOutResultsSuccessAction action will call
 * when mark selected students optInOrOptOut AIP responds is success
 * @param {Object} response
 * @return {{type: string}}
 */
export const markSelectedStudentsOptInOrOptOutResultsSuccessAction = response => ({
  type: 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT_SUCCESS',
});
/**
 * markSelectedStudentsOptInOrOptOutResultsFailureAction action will call
 * when mark selected students OptInOrOptOut AIP responds is fail
 * @param {String} message
 * @return {{type: string, message: {String}}}
 */
export const markSelectedStudentsOptInOrOptOutResultsFailureAction = message => ({
  type: 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT_FAILED',
  message,
});
/**
 * resetIsMarkOptInOrOptOutSuccessAction action will call when reset isMarkOptInOrOptOutSuccess flag
 * @return {{type: string}}
 */
export const resetIsMarkOptInOrOptOutSuccessAction = () => ({
  type: 'RESET_IS_MARK_OPT_IN_OR_OPT_OUT_SUCCESS',
});
/**
 * updateIdCardStatusSelectedStudentsAction action will call \
 * when update selected student IdCard status
 * @param {String} secretKey
 * @param {Array} selectedStudentsId
 * @param {Object} IdCardStatus
 * @return {{
 * IdCardStatus: {Object},
 * secretKey: {String},
 * type: string,
 * selectedStudentsId: {Array}
 * }}
 */
export const updateIdCardStatusSelectedStudentsAction = ({ secretKey, selectedStudentsId, IdCardStatus }) => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS',
  secretKey,
  selectedStudentsId,
  IdCardStatus,
});
/**
 * updateIdCardStatusSelectedStudentsResultsSuccessAction action will call when
 * update selected student IdCard status AIP response success
 * @param {Object} response
 * @return {{type: string}}
 */
export const updateIdCardStatusSelectedStudentsResultsSuccessAction = response => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS_SUCCESS',
});
/**
 * updateIdCardStatusSelectedStudentsResultsFailureAction action will call when
 * update selected student IdCard status AIP response fail
 * @param {String} message
 * @return {{type: string, message: {String}}}
 */
export const updateIdCardStatusSelectedStudentsResultsFailureAction = message => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS_FAILED',
  message,
});
/**
 * resetIsUpdateIdCardStatusSuccessAction action will
 * call when reset isUpdateIdCardStatusSuccess flag
 * @return {{type: string}}
 */
export const resetIsUpdateIdCardStatusSuccessAction = () => ({
  type: 'RESET_IS_UPDATE_ID_CARD_STATUS_SUCCESS',
});
/**
 * setHashLinkForStudentCredentialAction action will call when set user
 * type redirect to student registration correction form
 * @param {String} hashLink
 * @return {{hashLink: {String}, type: string}}
 */
export const setHashLinkForStudentCredentialAction = hashLink => ({
  type: 'SET_HASH_LINK_FOR_STUDENT_CREDENTIAL',
  hashLink,
});
/**
 * setHashLinkForNewRegistrationAction action will
 * call to set user type when redirect to new registration route
 * @param {String} userType
 * @return {{userType: {String}, type: string}}
 */
export const setHashLinkForNewRegistrationAction = userType => ({
  type: 'SET_HASH_LINK_FOR_NEW_REGISTRATION',
  userType,
});
/**
 * parentsRegistrationAction action will call when submit form of parents registration
 * @param {String} name
 * @param {Number} members
 * @param {String} phoneNumber
 * @return {{phoneNumber: {String}, members: {Number}, name: {String}, type: string}}
 */
export const parentsRegistrationAction = ({ name, members, phoneNumber }) => ({
  type: 'PARENTS_REGISTRATION',
  name,
  members,
  phoneNumber,
});
/**
 * parentsRegistrationResultsSuccessAction action will call
 * when parents registration AIP response is success
 * @param {Object} response
 * @return {{response: {Object}, type: string}}
 */
export const parentsRegistrationResultsSuccessAction = response => ({
  type: 'PARENTS_REGISTRATION_RESULT_SUCCESS',
  response,
});
/**
 * parentsRegistrationResultsFailureAction action will call
 * when parents registration AIP response is fail
 * @param {String} message
 * @return {{type: string, message: *}}
 */
export const parentsRegistrationResultsFailureAction = message => ({
  type: 'PARENTS_REGISTRATION_RESULT_FAILED',
  message,
});
/**
 * setUserTypeAction action set the user type
 * @param {String} pageUser
 * @return {{pageUser: string, type: string}}
 */
export const setUserTypeAction = pageUser => ({
  type: 'SET_USER_TYPE',
  pageUser,
});
/**
 * setLoadingStateAction action set the loading state
 * @param {Boolean} isLoading
 * @return {{isLoading: boolean, type: string}}
 */
export const setLoadingStateAction = isLoading => ({
    type: 'SET_LOADING_STATE',
    isLoading,
  });
