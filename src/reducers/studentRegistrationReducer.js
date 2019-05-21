import {
  getInitialVisibleColumnConfig,
} from '../utils/dataGridUtils';

const initialState = {
  student: {},
  isLoading: false,
  isFetched: false,
  isUpdated: false,
  isCreated: false,
  id: '',
  secretKey: '',
  adminId: '',
  adminPassword: '',
  updateMessage: '',
  updatedStudent: {},
};

export const studentRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CREATE_STUDENT':
      return {
        ...state,
        isLoading: true,
        isCreated: false,
      };
    case 'FETCH_STUDENT':
      return {
        ...state,
        isLoading: true,
        isFetched: false,
        isUpdated: false,
      };

    case 'SET_STUDENT_CREDENTIALS':
      return {
        ...state,
        id: action.id,
        secretKey: action.secretKey,
      };

    case 'UPDATE_STUDENT':
      return {
        ...state,
        isLoading: true,
        isUpdated: false,
      };

    case 'CREATE_STUDENT_SUCCESS':
      return {
        ...state,
        newStudent: { ...state.newStudent, ...action.newStudent },
        isLoading: false,
        isCreated: true,
      };

    case 'UPDATE_STUDENT_SUCCESS':
      // store student data in sessionStorage
      // In case student get back on the student correction form
      // student will get their all information
      // maintain student credential session
      sessionStorage.setItem('studentData', JSON.stringify(action.student.student));
      return {
        ...state,
        updatedStudent: { ...state.student, ...action.student },
        isLoading: false,
        isUpdated: true,
      };
    case 'FETCH_STUDENT_SUCCESS':
      // store student data in sessionStorage
      // In case student get back on the student correction form
      // student will get their all information
      // maintain student credential session
      sessionStorage.setItem('studentData', JSON.stringify(action.student));
      return {
        ...state,
        student: { ...action.student },
        isLoading: false,
        isFetched: true,
      };

    case 'CREATE_STUDENT_FAILED':
      return {
        ...state,
        isLoading: false,
        isCreated: false,
      };

    case 'UPDATE_STUDENT_FAILED':
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
      };

    case 'FETCH_STUDENT_FAILED':
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
    case 'SET_STUDENT_DATA':
      return {
        ...state,
        student: action.student,
        isFetched: true,
      };
    case 'UPDATE_STUDENT_BY_ADMIN':
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
        student: '',
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const studentSearchReducer = (state = {}, action) => {
  switch (action.type) {

    case 'FETCH_SEARCH_RESULTS_SUCCESS':
      return {
        ...state,
        searchResults: { students: action.searchResults },
      };

    case 'SET_NO_RECORDS_FOUND_MESSAGE':
      return {
        ...state,
        searchResults: { message: action.message },
      };

    case 'CLEAR_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: { students: [] },
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

const allStudentsDataReducerInitialState = {
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

export const allStudentsDataReducer = (state = allStudentsDataReducerInitialState, action) => {
  switch (action.type) {
    case 'GET_ALL_STUDENTS':
      return {
        ...state,
        secretKey: action.secretKey,
        isLoading: true,
      };
    case 'GET_ALL_STUDENTS_RESULTS_SUCCESS':
      return {
        ...state,
        students: action.students,
        isLoading: false,
      };
    case 'GET_ALL_STUDENTS_RESULTS_FAILURE':
      return {
        ...state,
        students: [],
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
        visibleColumnConfig: allStudentsDataReducerInitialState.visibleColumnConfig,
        selectValue: allStudentsDataReducerInitialState.selectValue,
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
    case 'MARK_SELECTED_STUDENTS_ATTENDANCE_SUCCESS':
      return {
        ...state,
        isMarkAttendanceSuccess: true,
        isMarkAttendanceFailed: false,
      };
    case 'MARK_SELECTED_STUDENTS_ATTENDANCE_FAILED':
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
    case 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT_SUCCESS':
      return {
        ...state,
        isMarkOptInOrOptOutSuccess: true,
        isMarkOptInOrOptOutFailed: false,
      };
    case 'MARK_SELECTED_STUDENTS_OPT_IN_OR_OPT_OUT_FAILED':
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
    case 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS_SUCCESS':
      return {
        ...state,
        isUpdateIdCardStatusSuccess: true,
        isUpdateIdCardStatusFailed: false,
      };
    case 'UPDATE_ID_CARD_STATUS_OF_SELECTED_STUDENTS_FAILED':
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
    case 'SET_HASH_LINK_FOR_STUDENT_CREDENTIAL':
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

export const getStudent = state => state.studentRegistrationReducer.student;

export const getNewStudent = state => state.studentRegistrationReducer.newStudent;

export const isLoading = state => state.studentRegistrationReducer.isLoading;

export const isUpdated = state => state.studentRegistrationReducer.isUpdated;

export const isCreated = state => state.studentRegistrationReducer.isCreated;

export const isFetched = state => state.studentRegistrationReducer.isFetched;
// this may be use in future
// export const updateMessage = state => state.studentRegistrationReducer.student.message;

export const getUserId = state => state.studentRegistrationReducer.id;

export const getUserSecretKey = state => state.studentRegistrationReducer.secretKey;

export const getAdminId = state => state.studentRegistrationReducer.adminId;

export const getAdminPassword = state => state.studentRegistrationReducer.adminPassword;

export const getSearchResults = state => state.studentSearchReducer.searchResults;

export const allStudentsData = state => state.allStudentsDataReducer.students;

export const stateOfRedirect = state => state.allStudentsDataReducer.redirect;

export const stateOfAdminLogin = state => state.allStudentsDataReducer.adminLoginState;
// this may be use in future.
// export const setStudentData = state => state.studentRegistrationReducer.student;

export const getVisibleColumnConfig = state => state.allStudentsDataReducer.visibleColumnConfig;

export const getSelectValue = state => state.allStudentsDataReducer.selectValue;

export const isGetAllStudentsLoading = state => state.allStudentsDataReducer.isLoading;

export const getSecretKey = state => state.studentRegistrationReducer.adminPassword;

export const getSuccess = state => state.allStudentsDataReducer.isUploadAttendanceSuccess;

export const isUploadAttendanceFailed = state => state.allStudentsDataReducer.isUploadAttendanceFailed;

export const getFailRecordIds = state => state.allStudentsDataReducer.failRecordIds;

export const isOptInSuccess = state => state.allStudentsDataReducer.isOptInSuccess;

export const isUploadOptInFailed = state => state.allStudentsDataReducer.isUploadOptInFailed;

export const getFailOptIn = state => state.allStudentsDataReducer.failOptIn;

export const isMarkAttendanceSuccess = state => state.allStudentsDataReducer.isMarkAttendanceSuccess;

export const isMarkOptInOrOptOutSuccess = state => state.allStudentsDataReducer.isMarkOptInOrOptOutSuccess;

export const isUpdateIdCardStatusSuccess = state => state.allStudentsDataReducer.isUpdateIdCardStatusSuccess;

export const getHash = state => state.allStudentsDataReducer.hashLink;

export const getUserType = state => state.allStudentsDataReducer.userType;

export const isMarkAttendanceFailed = state => state.allStudentsDataReducer.isMarkAttendanceFailed;

export const isMarkOptInOrOptOutFailed = state => state.allStudentsDataReducer.isMarkOptInOrOptOutFailed;

export const isUpdateIdCardStatusFailed = state => state.allStudentsDataReducer.isUpdateIdCardStatusFailed;
/**
 * idNotExist is contained students ids which are not exist at
 * the time of uploading file of students attendance.
 * @param {Object} state
 * @return {String} idNotExistErrorMessage
 */
export const idNotExistErrorMessage = state => state.allStudentsDataReducer.idNotExistErrorMessage;
/**
 * isIdUnavailable is contained students ids which are not exist at
 * the time of uploading file of students optIN.
 * @param {Object} state
 * @return {String} unavailableIdErrorMessage
 */
export const unavailableIdErrorMessage = state => state.allStudentsDataReducer.unavailableIdErrorMessage;
/**
 * getPageUserType return the user type
 * @param {Object} state
 * @return {string|String}
 */
export const getPageUserType = state => state.allStudentsDataReducer.pageUser;

export const getLoaderState = state => state.loaderReducer.isLoading;
