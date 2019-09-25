import {
  getInitialVisibleColumnConfig,
} from '../utils/dataGridUtils';

const initialState = {
  member: {},
  isLoading: false,
  isFetched: false,
  isUpdated: false,
  isCreated: false,
  id: '',
  secretKey: '',
  adminId: '',
  adminPassword: '',
  updateMessage: '',
  updatedMember: {},
};

export const memberRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_MEMBER':
      return {
        ...state,
        isLoading: true,
        isCreated: false,
      };
    case 'FETCH_MEMBER':
      return {
        ...state,
        isLoading: true,
        isFetched: false,
        isUpdated: false,
      };

    case 'SET_MEMBER_CREDENTIALS':
      return {
        ...state,
        id: action.id,
        secretKey: action.secretKey,
      };

    case 'UPDATE_MEMBER':
      return {
        ...state,
        isLoading: true,
        isUpdated: false,
      };

    case 'CREATE_MEMBER_SUCCESS':
      return {
        ...state,
        newMember: { ...state.newMember, ...action.newMember },
        isLoading: false,
        isCreated: true,
      };

    case 'UPDATE_MEMBER_SUCCESS':
      // store member data in sessionStorage
      // In case member get back on the member correction form
      // member will get their all information
      // maintain member credential session
      sessionStorage.setItem('memberData', JSON.stringify(action.member));
      return {
        ...state,
        updatedMember: { ...state.member, ...action.member },
        isLoading: false,
        isUpdated: true,
      };
    case 'FETCH_MEMBER_SUCCESS':
      // store member data in sessionStorage
      // In case member get back on the member correction form
      // member will get their all information
      // maintain member credential session
      sessionStorage.setItem('memberData', JSON.stringify(action.member));
      return {
        ...state,
        member: { ...action.member },
        isLoading: false,
        isFetched: true,
      };

    case 'CREATE_MEMBER_FAILED':
      return {
        ...state,
        isLoading: false,
        isCreated: false,
      };

    case 'UPDATE_MEMBER_FAILED':
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
      };

    case 'FETCH_MEMBER_FAILED':
      return {
        ...state,
        isLoading: false,
        isFetched: false,
      };

    case 'SET_ADMIN_CREDENTIALS':
      return {
        ...state,
        adminId: action.id,
        adminPassword: action.password,
      };

    case 'RESET_ADMIN_CREDENTIALS':
      return {
        ...state,
        adminId: action.id,
        adminPassword: action.password,
      };

    case 'FETCH_SEARCH_RESULTS':
      return {
        ...state,
        isLoading: true,
      };

    case 'FETCH_SEARCH_RESULTS_FAILURE':
    case 'FETCH_SEARCH_RESULTS_SUCCESS':
    case 'SET_NO_RECORDS_FOUND_MESSAGE':
      return {
        ...state,
        isLoading: false,
      };
    case 'SET_MEMBER_DATA':
      return {
        ...state,
        member: action.member,
        isFetched: true,
      };
    case 'UPDATE_MEMBER_BY_ADMIN':
      return {
        ...state,
        id: action.id,
        secretKey: action.secretKey,
      };
    case 'RESET_IS_UPDATE':
      return {
        ...state,
        isUpdated: false,
        id: '',
        secretKey: '',
        member: {},
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const memberSearchReducer = (state = {}, action) => {
  switch (action.type) {

    case 'FETCH_SEARCH_RESULTS_SUCCESS':
      return {
        ...state,
        searchResults: { members: action.searchResults },
      };

    case 'SET_NO_RECORDS_FOUND_MESSAGE':
      return {
        ...state,
        searchResults: { message: action.message },
      };

    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: { members: [] },
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

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

const initialStateOfLoader = {
  isLoading: false,
};
export const loaderReducer = (state = initialStateOfLoader, action) => {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getMember = state => state.memberRegistrationReducer.member;

export const getNewMember = state => state.memberRegistrationReducer.newMember;

export const isLoading = state => state.memberRegistrationReducer.isLoading;

export const isUpdated = state => state.memberRegistrationReducer.isUpdated;

export const isCreated = state => state.memberRegistrationReducer.isCreated;

export const isFetched = state => state.memberRegistrationReducer.isFetched;
// this may be use in future
// export const updateMessage = state => state.memberRegistrationReducer.member.message;

export const getUserId = state => state.memberRegistrationReducer.id;

export const getUserSecretKey = state => state.memberRegistrationReducer.secretKey;

export const getAdminId = state => state.memberRegistrationReducer.adminId;

export const getAdminPassword = state => state.memberRegistrationReducer.adminPassword;

export const getSearchResults = state => state.memberSearchReducer.searchResults;

export const allMembersData = state => state.allMembersDataReducer.members;

export const stateOfRedirect = state => state.allMembersDataReducer.redirect;

export const stateOfAdminLogin = state => state.allMembersDataReducer.adminLoginState;
// this may be use in future.
// export const setMemberData = state => state.memberRegistrationReducer.member;

export const getVisibleColumnConfig = state => state.allMembersDataReducer.visibleColumnConfig;

export const getSelectValue = state => state.allMembersDataReducer.selectValue;

export const isGetAllMembersLoading = state => state.allMembersDataReducer.isLoading;

export const getSecretKey = state => state.memberRegistrationReducer.adminPassword;

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

export const getLoaderState = state => state.loaderReducer.isLoading;
