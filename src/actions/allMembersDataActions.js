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
