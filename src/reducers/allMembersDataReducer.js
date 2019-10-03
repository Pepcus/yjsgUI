import { getInitialVisibleColumnConfig } from 'utils/common';

const allMembersDataReducerInitialState = {
  selectValue: true,
  visibleColumnConfig: getInitialVisibleColumnConfig(),
  isUploadAttendanceSuccess: false,
  isUploadAttendanceFailed: false,
  isOptInSuccess: false,
  isUploadOptInFailed: false,
  isLoading: false,
  isMarkAttendanceSuccess: false,
  isMarkOptInOrOptOutSuccess: false,
  isUpdateIdCardStatusSuccess: false,
  pageUser: '',
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
    case 'SET_REDIRECT_VALUE':
      return {
        ...state,
        redirect: action.redirect,
      };
    case 'SET_ADMIN_LOGIN_STATE':
      return {
        ...state,
        adminLoginState: action.adminLoginState,
      };
    case 'SET_VISIBLE_COLUMN_CONFIG_DATA':
      return {
        ...state,
        visibleColumnConfig: action.visibleColumnConfig,
        selectValue: action.selectValue,
      };
    case 'RESET_VISIBLE_COLUMN_CONFIG_DATA':
      return {
        ...state,
        visibleColumnConfig: allMembersDataReducerInitialState.visibleColumnConfig,
        selectValue: allMembersDataReducerInitialState.selectValue,
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
    case 'RESET_IS_SUCCESS':
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
    case 'SET_HASH_LINK_FOR_MEMBER_CREDENTIAL':
      return {
        ...state,
        hashLink: action.hashLink,
      };
    case 'SET_HASH_LINK_FOR_NEW_REGISTRATION':
      return {
        ...state,
        userType: action.userType,
      };
    case 'PARENTS_REGISTRATION_RESULT_SUCCESS':
      return {
        ...state,
      };
    case 'PARENTS_REGISTRATION_RESULT_FAILED':
      return {
        ...state,
      };
    case 'SET_USER_TYPE':
      return {
        ...state,
        pageUser: action.pageUser,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const allMembersData = state => state.allMembersDataReducer.members;

export const stateOfRedirect = state => state.allMembersDataReducer.redirect;

export const stateOfAdminLogin = state => state.allMembersDataReducer.adminLoginState;

export const getVisibleColumnConfig = state => state.allMembersDataReducer.visibleColumnConfig;

export const getSelectValue = state => state.allMembersDataReducer.selectValue;

export const getSuccess = state => state.allMembersDataReducer.isUploadAttendanceSuccess;

export const isUploadAttendanceFailed = state => state.allMembersDataReducer.isUploadAttendanceFailed;

export const getFailRecordIds = state => state.allMembersDataReducer.failRecordIds;

export const isOptInSuccess = state => state.allMembersDataReducer.isOptInSuccess;

export const isUploadOptInFailed = state => state.allMembersDataReducer.isUploadOptInFailed;

export const getFailOptIn = state => state.allMembersDataReducer.failOptIn;

export const isMarkAttendanceSuccess = state => state.allMembersDataReducer.isMarkAttendanceSuccess;

export const isMarkOptInOrOptOutSuccess = state => state.allMembersDataReducer.isMarkOptInOrOptOutSuccess;

export const isUpdateIdCardStatusSuccess = state => state.allMembersDataReducer.isUpdateIdCardStatusSuccess;

export const getHash = state => state.allMembersDataReducer.hashLink;

export const getUserType = state => state.allMembersDataReducer.userType;

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
/**
 * getPageUserType return the user type
 * @param {Object} state
 * @return {string|String}
 */
export const getPageUserType = state => state.allMembersDataReducer.pageUser;
