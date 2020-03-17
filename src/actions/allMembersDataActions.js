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
 * resetIsSuccessOfMemberAttendanceFileUploadAction action will call when reset
 * the isSuccess flag of members attendance file upload
 * @return {{type: String}}
 */
export const resetIsSuccessOfMemberAttendanceFileUploadAction = () => ({
  type: 'RESET_IS_SUCCESS_OF_MEMBER_ATTENDANCE_FILE',
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
export const uploadOptInFileResultsSuccessAction = (response) => {
  const { failRecordIds, idNotExist } = response;
  return ({
    type: 'UPLOAD_OPT_IN_FILE_SUCCESS',
    failRecordIds,
    idNotExist,
  });
};

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
 * @return {{type: String}}
 */
export const markSelectedMembersAttendanceResultsSuccessAction = () => ({
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
 * @return {{type: String}}
 */
export const markSelectedMembersOptInOrOptOutResultsSuccessAction = () => ({
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
 * @return {{type: String}}
 */
export const updateIdCardStatusSelectedMembersResultsSuccessAction = () => ({
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
