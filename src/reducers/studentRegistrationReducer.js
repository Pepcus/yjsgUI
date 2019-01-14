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
  updatedStudent: {}
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

    case 'CREATE_STUDENT_SUCCESS_ACTION':
      return {
        ...state,
        newStudent: {...state.newStudent, ...action.newStudent},
        isLoading: false,
        isCreated: true,
      };

    case 'UPDATE_STUDENT_SUCCESS_ACTION':
      return {
        ...state,
        updatedStudent: {...state.student, ...action.student},
        isLoading: false,
        isUpdated: true,
      };

    case 'FETCH_STUDENT_SUCCESS_ACTION':
      return {
        ...state,
        student: {...action.student},
        isLoading: false,
        isFetched: true,
      };

    case 'CREATE_STUDENT_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        isCreated: false,
      };

    case 'UPDATE_STUDENT_FAILED_ACTION':
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
      };

    case 'FETCH_STUDENT_FAILED_ACTION':
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
      return{
        ...state,
        student: action.student,
        isFetched: true,
      };
    case 'UPDATE_STUDENT_BY_ADMIN':
      return{
        ...state,
        id: action.id,
        secretKey: action.secretKey,
      };
    case 'RESET_IS_UPDATE':
      return{
        ...state,
        isUpdated: false,
        id: '',
        secretKey: '',
        student: '',
      };
    default: {
      return {
        ...state,
      }
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
      }
    }
  }
};

const allStudentsDataReducerInitialState = {
  selectValue: true,
  visibleColumnConfig: {
    column: true,
    studentId: true,
    name: true,
    fatherName: true,
    mobile: true,
    email: true,
    gender: true,
    age: true,
    address: true,
    education: true,
    classAttended2016: true,
    classAttended2017: true,
    attendance2016: true,
    attendance2017: true,
    classRoomNo2016: true,
    classRoomNo2017: true,
    marks2016: true,
    marks2017: true,
    edit: true,
  }
};

export const allStudentsDataReducer = (state = allStudentsDataReducerInitialState, action) => {
  switch (action.type) {

    case 'GET_ALL_STUDENTS_RESULTS_SUCCESS':
      return {
        ...state,
        students: action.students,
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
    default: {
      return {
        ...state,
      }
    }
  }
};
export const getStudent = state => state.studentRegistrationReducer.student;

export const getNewStudent = state => state.studentRegistrationReducer.newStudent;

export const isLoading = state => state.studentRegistrationReducer.isLoading;

export const isUpdated = state => state.studentRegistrationReducer.isUpdated;

export const isCreated = state => state.studentRegistrationReducer.isCreated;

export const isFetched = state => state.studentRegistrationReducer.isFetched;

export const updateMessage = state => state.studentRegistrationReducer.student.message;

export const getUserId = state => state.studentRegistrationReducer.id;

export const getUserSecretKey = state => state.studentRegistrationReducer.secretKey;

export const getAdminId = state => state.studentRegistrationReducer.adminId;

export const getAdminPassword = state => state.studentRegistrationReducer.adminPassword;

export const getSearchResults = state => state.studentSearchReducer.searchResults;

export const allStudentsData = state => state.allStudentsDataReducer.students;

export const stateOfRedirect = state => state.allStudentsDataReducer.redirect;

export const stateOfAdminLogin = state => state.allStudentsDataReducer.adminLoginState;

export const setStudentData = state => state.studentRegistrationReducer.student;

export const getVisibleColumnConfig = state => state.allStudentsDataReducer.visibleColumnConfig;

export const getSelectValue = state => state.allStudentsDataReducer.selectValue;


