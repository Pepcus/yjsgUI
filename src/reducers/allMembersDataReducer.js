const allMembersDataReducerInitialState = {
  isUploadAttendanceSuccess: false,
  isUploadAttendanceFailed: false,
  isOptInSuccess: false,
  isUploadOptInFailed: false,
  isLoading: false,
  isMarkAttendanceSuccess: false,
  isMarkOptInOrOptOutSuccess: false,
  isUpdateIdCardStatusSuccess: false,
};

export const allMembersDataReducer = (state = allMembersDataReducerInitialState, action) => {
  switch (action.type) {
    case 'GET_ALL_MEMBERS':
      return {
        ...state,
        secretKey: action.secretKey,
        isLoading: true,
      };
    case 'GET_ALL_MEMBER_RESULTS_SUCCESS':
      return {
        ...state,
        members: action.members,
        isLoading: false,
      };
    case 'GET_ALL_MEMBERS_RESULTS_FAILURE':
      return {
        ...state,
        members: [],
        isLoading: false,
      };
    case 'UPLOAD_ATTENDANCE_FILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isUploadAttendanceSuccess: true,
        isUploadAttendanceFailed: false,
        failRecordIds: action.failRecordIds,
        idNotExistErrorMessage: action.idNotExist,
      };
    case 'UPLOAD_ATTENDANCE_FILE_FAILED':
      return {
        ...state,
        isLoading: false,
        isUploadAttendanceSuccess: false,
        isUploadAttendanceFailed: true,
        failRecordIds: '',
        idNotExistErrorMessage: '',
      };
    case 'RESET_IS_SUCCESS_OF_MEMBER_ATTENDANCE_FILE':
      return {
        ...state,
        isUploadAttendanceSuccess: false,
        isUploadAttendanceFailed: false,
        failRecordIds: '',
        idNotExistErrorMessage: '',
      };
    case 'UPLOAD_OPT_IN_FILE_SUCCESS':
      return {
        ...state,
        isOptInSuccess: true,
        isUploadOptInFailed: false,
        failOptIn: action.failRecordIds,
        unavailableIdErrorMessage: action.idNotExist,
      };
    case 'UPLOAD_OPT_IN_FILE_FAILED':
      return {
        ...state,
        isUploadOptInFailed: true,
        isOptInSuccess: false,
        failOptIn: '',
        unavailableIdErrorMessage: '',
      };
    case 'RESET_IS_OPT_IN_SUCCESS':
      return {
        ...state,
        isOptInSuccess: false,
        isUploadOptInFailed: false,
        failOptIn: '',
        unavailableIdErrorMessage: '',
      };
    case 'MARK_SELECTED_MEMBERS_ATTENDANCE_SUCCESS':
      return {
        ...state,
        isMarkAttendanceSuccess: true,
        isMarkAttendanceFailed: false,
      };
    case 'MARK_SELECTED_MEMBERS_ATTENDANCE_FAILED':
      return {
        ...state,
        isMarkAttendanceSuccess: false,
        isMarkAttendanceFailed: true,
      };
    case 'RESET_IS_MARK_ATTENDANCE_SUCCESS':
      return {
        ...state,
        isMarkAttendanceSuccess: false,
        isMarkAttendanceFailed: false,
      };
    case 'MARK_SELECTED_MEMBERS_OPT_IN_OR_OPT_OUT_SUCCESS':
      return {
        ...state,
        isMarkOptInOrOptOutSuccess: true,
        isMarkOptInOrOptOutFailed: false,
      };
    case 'MARK_SELECTED_MEMBERS_OPT_IN_OR_OPT_OUT_FAILED':
      return {
        ...state,
        isMarkOptInOrOptOutSuccess: false,
        isMarkOptInOrOptOutFailed: true,
      };
    case 'RESET_IS_MARK_OPT_IN_OR_OPT_OUT_SUCCESS':
      return {
        ...state,
        isMarkOptInOrOptOutSuccess: false,
        isMarkOptInOrOptOutFailed: false,
      };
    case 'UPDATE_ID_CARD_STATUS_OF_SELECTED_MEMBERS_SUCCESS':
      return {
        ...state,
        isUpdateIdCardStatusSuccess: true,
        isUpdateIdCardStatusFailed: false,
      };
    case 'UPDATE_ID_CARD_STATUS_OF_SELECTED_MEMBERS_FAILED':
      return {
        ...state,
        isUpdateIdCardStatusSuccess: false,
        isUpdateIdCardStatusFailed: true,
      };
    case 'RESET_IS_UPDATE_ID_CARD_STATUS_SUCCESS':
      return {
        ...state,
        isUpdateIdCardStatusSuccess: false,
        isUpdateIdCardStatusFailed: false,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const allMembersData = state => state.allMembersDataReducer.members;

export const getSuccess = state => state.allMembersDataReducer.isUploadAttendanceSuccess;

export const isUploadAttendanceFailed = state => state.allMembersDataReducer.isUploadAttendanceFailed;

export const getFailRecordIds = state => state.allMembersDataReducer.failRecordIds;

export const isOptInSuccess = state => state.allMembersDataReducer.isOptInSuccess;

export const isUploadOptInFailed = state => state.allMembersDataReducer.isUploadOptInFailed;

export const getFailOptIn = state => state.allMembersDataReducer.failOptIn;

export const isMarkAttendanceSuccess = state => state.allMembersDataReducer.isMarkAttendanceSuccess;

export const isMarkOptInOrOptOutSuccess = state => state.allMembersDataReducer.isMarkOptInOrOptOutSuccess;

export const isUpdateIdCardStatusSuccess = state => state.allMembersDataReducer.isUpdateIdCardStatusSuccess;

export const isMarkAttendanceFailed = state => state.allMembersDataReducer.isMarkAttendanceFailed;

export const isMarkOptInOrOptOutFailed = state => state.allMembersDataReducer.isMarkOptInOrOptOutFailed;

export const isUpdateIdCardStatusFailed = state => state.allMembersDataReducer.isUpdateIdCardStatusFailed;

/**
 * idNotExist is contained members ids which are not exist at
 * the time of uploading file of members attendance.
 * @param {Object} state
 * @return {String} idNotExistErrorMessage
 */
export const idNotExistErrorMessage = state => state.allMembersDataReducer.idNotExistErrorMessage;
/**
 * isIdUnavailable is contained members ids which are not exist at
 * the time of uploading file of members optIN.
 * @param {Object} state
 * @return {String} unavailableIdErrorMessage
 */
export const unavailableIdErrorMessage = state => state.allMembersDataReducer.unavailableIdErrorMessage;

