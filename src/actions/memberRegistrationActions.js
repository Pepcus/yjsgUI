export const checkValidUserInfo = errorMessageObject => ({
  type: 'CHECK_FOR_VALID_USER_INFO',
  errorMessageObject,
});
/**
 * createMemberDataAction action will call when new member will create.
 * @param {Object} member
 * @return {{member: Object, type: string}}
 */
export const createMemberDataAction = member => ({
  type: 'CREATE_MEMBER',
  member,
});
/**
 * setMemberCredentialsAction call when new member is created,
 * or already member login with their credential.
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: String, id: String, type: string}}
 */
export const setMemberCredentialsAction = ({ id, secretKey }) => ({
  type: 'SET_MEMBER_CREDENTIALS',
  id,
  secretKey,
});
/**
 * createMemberSuccessAction action will call when
 * create member AIP response is success
 * @param {Object} newMember
 * @return {{newMember: Object, type: string}}
 */
export const createMemberSuccessAction = newMember => ({
  type: 'CREATE_MEMBER_SUCCESS',
  newMember,
});
/**
 * createMemberFailedAction action will call when
 * create member AIP response is fail
 * @param {String} message
 * @return {{type: string, message: String}}
 */
export const createMemberFailedAction = message => ({
  type: 'CREATE_MEMBER_FAILED',
  message,
});
/**
 * fetchMemberDataAction action will call when
 * member data will fetched
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: String, id: String, type: string}}
 */
export const fetchMemberDataAction = ({ id, secretKey }) => ({
  type: 'FETCH_MEMBER',
  id,
  secretKey,
});
/**
 * fetchMemberSuccessAction action will call when
 * fetch member data AIP response is success
 * @param {Object} member
 * @return {{member: Object, type: string}}
 */
export const fetchMemberSuccessAction = member => ({
  type: 'FETCH_MEMBER_SUCCESS',
  member,
});
/**
 * fetchMemberFailedAction action will call when
 * fetch member data AIP response is fail
 * @param {String} message
 * @return {{type: string, message: String}}
 */
export const fetchMemberFailedAction = message => ({
  type: 'FETCH_MEMBER_FAILED',
  message,
});
/**
 * updateMemberDataAction action will call when member data will updated.
 * @param {String} id
 * @param {String} secretKey
 * @param {Object} updatedMember
 * @return {{updatedMember: Object, secretKey: String, id: String, type: string}}
 */
export const updateMemberDataAction = ({ id, secretKey, member }) => ({
  type: 'UPDATE_MEMBER',
  id,
  secretKey,
  member,
});
/**
 * updateMemberSuccessAction action will call when
 * update member data AIP response is success
 * @param {Object} member
 * @return {{member: Object, type: string}}
 */
export const updateMemberSuccessAction = member => ({
  type: 'UPDATE_MEMBER_SUCCESS',
  member,
});
/**
 * updateMemberFailedAction action will call when
 * update member data AIP response is fail
 * @param {String} message
 * @return {{type: string, message: String}}
 */
export const updateMemberFailedAction = message => ({
  type: 'UPDATE_MEMBER_FAILED',
  message,
});
/**
 * setAdminCredentialsAction action will call
 * when admin login with their credential
 * @param {String} id
 * @param {String} password
 * @return {{password: String, id: String, type: string}}
 */
export const setAdminCredentialsAction = ({ id, password }) => ({
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
 * fetchSearchResultsAction action fetch the member data according the searchValue
 * @param {String} adminKey
 * @param {String} searchKey
 * @param {String} searchValue
 * @return {{searchKey: String, type: string, adminKey: String, searchValue: String}}
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
 * @return {{type: string, searchResults: Array}}
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
 * @return {{type: String, message: String}}
 */
export const setNoRecordsFoundMessageAction = message => ({
  type: 'SET_NO_RECORDS_FOUND_MESSAGE',
  message,
});
/**
 * getAllMembersAction action will call when all members data will fetch.
 * @param {String} secretKey
 * @return {{secretKey: String, type: String}}
 */
export const getAllMembersAction = ({ secretKey }) => ({
  type: 'GET_ALL_MEMBERS',
  secretKey,
});
/**
 * getAllMembersDataResultsSuccessAction action will call
 * when fetch all members data API responds is success.
 * @param {Array} members
 * @return {{members: Array, type: String}}
 */
export const getAllMembersDataResultsSuccessAction = members => ({
  type: 'GET_ALL_MEMBER_RESULTS_SUCCESS',
  members,
});
/**
 * getAllMembersDataResultsFailureAction action will call
 * when fetch all members data API responds is fail.
 * @param {String} errorMessage
 * @return {{errorMessage: String, type: String}}
 */
export const getAllMembersDataResultsFailureAction = errorMessage => ({
  type: 'GET_ALL_MEMBERS_RESULTS_FAILURE',
  errorMessage,
});
/**
 * setRedirectValueAction action will call when admin is login
 * or admin is logout
 * @param {Boolean} redirect
 * @return {{redirect: Boolean, type: String}}
 */
export const setRedirectValueAction = ({ redirect }) => ({
  type: 'SET_REDIRECT_VALUE',
  redirect,
});
/**
 * setAdminLoginStateAction action will call when admin is login
 * or logout
 * @param {Boolean} adminLoginState
 * @return {{adminLoginState: Boolean, type: String}}
 */
export const setAdminLoginStateAction = ({ adminLoginState }) => ({
  type: 'SET_ADMIN_LOGIN_STATE',
  adminLoginState,
});
/**
 * setMemberDataAction action will call when click on edit button of particular row
 * in members grid
 * @param {Object} member
 * @return {{member: Object, isFetched: Boolean, type: String}}
 */
export const setMemberDataAction = ({ member }) => ({
  type: 'SET_MEMBER_DATA',
  member,
  isFetched: true,
});
/**
 * updateMemberByAdminAction action will call
 * when member data will update by admin
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: String, id: String, type: String}}
 */
export const updateMemberByAdminAction = ({ id, secretKey }) => ({
  type: 'UPDATE_MEMBER_BY_ADMIN',
  id,
  secretKey,
});
/**
 * isUpdatedResetAction action will call when reset the update information form store
 * @return {{secretKey: String, member: String, isUpdated: Boolean, id: String, type: String}}
 */
export const isUpdatedResetAction = () => ({
  type: 'RESET_IS_UPDATE',
  isUpdated: false,
  id: '',
  secretKey: '',
  member: '',
});
/**
 * setVisibleColumnConfigAction action will
 * call when set the updated column option data in store
 * @param {Object} visibleColumnConfig
 * @param {Boolean} selectValue
 * @return {{visibleColumnConfig: Object, selectValue: Boolean, type: String}}
 */
export const setVisibleColumnConfigAction = ({ visibleColumnConfig, selectValue }) => ({
  type: 'SET_VISIBLE_COLUMN_CONFIG_DATA',
  visibleColumnConfig,
  selectValue,
});
/**
 * resetVisibleColumnConfigAction action will set the column option to initial state in store
 * on logout of admin
 * @return {{type: String}}
 */
export const resetVisibleColumnConfigAction = () => ({
  type: 'RESET_VISIBLE_COLUMN_CONFIG_DATA',
});
/**
 * uploadMembersAttendanceFileAction action will call when upload member attendance file
 * @param {String} secretKey
 * @param {Object} attendanceFile
 * @param {String} day
 * @return {{secretKey: String, type: String, day: String,  attendanceFile: Object}}
 */
export const uploadMembersAttendanceFileAction = ({ secretKey, attendanceFile, day }) => ({
  type: 'UPLOAD_ATTENDANCE_FILE',
  secretKey,
  attendanceFile,
  day,
});
/**
 * uploadAttendanceFileResultsSuccessAction action will call
 * when upload members attendance file API response is success
 * @param {Object} response
 * @return {{type: String, failRecordIds: Null}}
 */
export const uploadAttendanceFileResultsSuccessAction = response => ({
  type: 'UPLOAD_ATTENDANCE_FILE_SUCCESS',
  failRecordIds: response.failRecordIds,
  idNotExist: response.idNotExist,
});
/**
 * uploadAttendanceFileResultsFailureAction action will call when
 * upload members attendance file API response is fail
 * @param {String} message
 * @return {{type: String, message: String}}
 */
export const uploadAttendanceFileResultsFailureAction = message => ({
  type: 'UPLOAD_ATTENDANCE_FILE_FAILED',
  message,
});
/**
 * resetIsSuccessAction action will call when reset
 * the isSuccess flag of members attendance file upload
 * @return {{type: String}}
 */
export const resetIsSuccessAction = () => ({
  type: 'RESET_IS_SUCCESS',
});
/**
 * uploadOptInFileAction action will call when upload members optIn file
 * @param {String} secretKey
 * @param {Object} optInFile
 * @return {{secretKey: String, optInFile: String, type: String}}
 */
export const uploadOptInFileAction = ({ secretKey, optInFile }) => ({
  type: 'UPLOAD_OPT_IN_FILE',
  secretKey,
  optInFile,
});
/**
 * uploadOptInFileResultsSuccessAction action will call
 * when upload members optIn file API respond is success
 * @param {Object} response
 * @return {{type: String, failRecordIds: Null}}
 */
export const uploadOptInFileResultsSuccessAction = response => ({
  type: 'UPLOAD_OPT_IN_FILE_SUCCESS',
  failRecordIds: response.failRecordIds,
  idNotExist: response.idNotExist,
});
/**
 * uploadOptInFileResultsFailureAction action will call
 * when upload members optIn file API respond is fail
 * @param {String} message
 * @return {{type: String, message: String}}
 */
export const uploadOptInFileResultsFailureAction = message => ({
  type: 'UPLOAD_OPT_IN_FILE_FAILED',
  message,
});
/**
 * resetIsOptInSuccessAction action will call when
 * reset isOptInSuccess flag
 * @return {{type: String}}
 */
export const resetIsOptInSuccessAction = () => ({
  type: 'RESET_IS_OPT_IN_SUCCESS',
});
/**
 * markSelectedMembersAttendanceAction action will call when mark selected member attendance
 * @param {String} secretKey
 * @param {Array} selectedMembersId
 * @param {Object} day
 * @return {{secretKey: String, type: String, day: Object, selectedMembersId: Array}}
 */
export const markSelectedMembersAttendanceAction = ({ secretKey, selectedMembersId, day }) => ({
  type: 'MARK_SELECTED_MEMBERS_ATTENDANCE',
  secretKey,
  selectedMembersId,
  day,
});
/**
 * markSelectedMembersAttendanceResultsSuccessAction action will call
 * when mark selected members attendance AIP responds is success
 * @param {Object} response
 * @return {{type: String}}
 */
export const markSelectedMembersAttendanceResultsSuccessAction = response => ({
  type: 'MARK_SELECTED_MEMBERS_ATTENDANCE_SUCCESS',
});
/**
 * markSelectedMembersAttendanceResultsFailureAction action will call
 * when mark selected members attendance AIP responds is fail
 * @param {String} message
 * @return {{type: String, message: String}}
 */
export const markSelectedMembersAttendanceResultsFailureAction = message => ({
  type: 'MARK_SELECTED_MEMBERS_ATTENDANCE_FAILED',
  message,
});
/**
 * resetIsMarkAttendanceSuccessAction action will call when reset isMarkAttendanceSuccess flag
 * @return {{type: String}}
 */
export const resetIsMarkAttendanceSuccessAction = () => ({
  type: 'RESET_IS_MARK_ATTENDANCE_SUCCESS',
});
/**
 * markSelectedMembersOptInOrOptOutAction action will call when mark selected member optInOrOptOut
 * @param {String} secretKey
 * @param {Array} selectedMembersId
 * @param {Object} opt
 * @return {{opt: Object, secretKey: String, type: String, selectedMembersId: Array}}
 */
export const markSelectedMembersOptInOrOptOutAction = ({ secretKey, selectedMembersId, opt }) => ({
  type: 'MARK_SELECTED_MEMBERS_OPT_IN_OR_OPT_OUT',
  secretKey,
  selectedMembersId,
  opt,
});
/**
 * markSelectedMembersOptInOrOptOutResultsSuccessAction action will call
 * when mark selected members optInOrOptOut AIP responds is success
 * @param {Object} response
 * @return {{type: String}}
 */
export const markSelectedMembersOptInOrOptOutResultsSuccessAction = response => ({
  type: 'MARK_SELECTED_MEMBERS_OPT_IN_OR_OPT_OUT_SUCCESS',
});
/**
 * markSelectedMembersOptInOrOptOutResultsFailureAction action will call
 * when mark selected members OptInOrOptOut AIP responds is fail
 * @param {String} message
 * @return {{type: String, message: String}}
 */
export const markSelectedMembersOptInOrOptOutResultsFailureAction = message => ({
  type: 'MARK_SELECTED_MEMBERS_OPT_IN_OR_OPT_OUT_FAILED',
  message,
});
/**
 * resetIsMarkOptInOrOptOutSuccessAction action will call when reset isMarkOptInOrOptOutSuccess flag
 * @return {{type: String}}
 */
export const resetIsMarkOptInOrOptOutSuccessAction = () => ({
  type: 'RESET_IS_MARK_OPT_IN_OR_OPT_OUT_SUCCESS',
});
/**
 * updateIdCardStatusSelectedMembersAction action will call \
 * when update selected member IdCard status
 * @param {String} secretKey
 * @param {Array} selectedMembersId
 * @param {Object} IdCardStatus
 * @return {{IdCardStatus: Object, secretKey: String, type: string, selectedMembersId: Array}}
 */
export const updateIdCardStatusSelectedMembersAction = ({ secretKey, selectedMembersId, IdCardStatus }) => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_MEMBERS',
  secretKey,
  selectedMembersId,
  IdCardStatus,
});
/**
 * updateIdCardStatusSelectedMembersResultsSuccessAction action will call when
 * update selected member IdCard status AIP response success
 * @param {Object} response
 * @return {{type: String}}
 */
export const updateIdCardStatusSelectedMembersResultsSuccessAction = response => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_MEMBERS_SUCCESS',
});
/**
 * updateIdCardStatusSelectedMembersResultsFailureAction action will call when
 * update selected member IdCard status AIP response fail
 * @param {String} message
 * @return {{type: String, message: String}}
 */
export const updateIdCardStatusSelectedMembersResultsFailureAction = message => ({
  type: 'UPDATE_ID_CARD_STATUS_OF_SELECTED_MEMBERS_FAILED',
  message,
});
/**
 * resetIsUpdateIdCardStatusSuccessAction action will
 * call when reset isUpdateIdCardStatusSuccess flag
 * @return {{type: String}}
 */
export const resetIsUpdateIdCardStatusSuccessAction = () => ({
  type: 'RESET_IS_UPDATE_ID_CARD_STATUS_SUCCESS',
});
/**
 * setHashLinkForMemberCredentialAction action will call when set user
 * type redirect to member registration correction form
 * @param {String} hashLink
 * @return {{hashLink: String, type: String}}
 */
export const setHashLinkForMemberCredentialAction = hashLink => ({
  type: 'SET_HASH_LINK_FOR_MEMBER_CREDENTIAL',
  hashLink,
});
/**
 * setHashLinkForNewRegistrationAction action will
 * call to set user type when redirect to new registration route
 * @param {String} userType
 * @return {{userType: String, type: String}}
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
 * @return {{phoneNumber: String, members: Number, name: String, type: String}}
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
 * @return {{response: Object, type: String}}
 */
export const parentsRegistrationResultsSuccessAction = response => ({
  type: 'PARENTS_REGISTRATION_RESULT_SUCCESS',
  response,
});
/**
 * parentsRegistrationResultsFailureAction action will call
 * when parents registration AIP response is fail
 * @param {String} message
 * @return {{type: String, message: String}}
 */
export const parentsRegistrationResultsFailureAction = message => ({
  type: 'PARENTS_REGISTRATION_RESULT_FAILED',
  message,
});
/**
 * setUserTypeAction action set the user type
 * @param {String} pageUser
 * @return {{pageUser: String, type: String}}
 */
export const setUserTypeAction = ({ pageUser }) => ({
  type: 'SET_USER_TYPE',
  pageUser,
});
/**
 * setLoadingStateAction action set the loading state
 * @param {Boolean} isLoading
 * @return {{isLoading: Boolean, type: String}}
 */
export const setLoadingStateAction = isLoading => ({
  type: 'SET_LOADING_STATE',
  isLoading,
});

