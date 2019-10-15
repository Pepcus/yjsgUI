const initialStateOfLoader = {
  isAdminLogin: false,
  adminId: '',
  adminPassword: '',
};

export const loginReducer = (state = initialStateOfLoader, action) => {
  switch (action.type) {
    case 'ADMIN_LOGIN_SUCCESS':
      return {
        ...state,
        isAdminLogin: true,
      };
    case 'ADMIN_LOGIN_FAIL':
      return {
        ...state,
        isAdminLogin: false,
      };
    case 'RESET_LOGIN_ADMIN_STATE':
      return {
        ...state,
        isAdminLogin: false,
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
        adminId: '',
        adminPassword: '',
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getAdminLoginState = state => state.loginReducer.isAdminLogin;

export const getAdminId = state => state.loginReducer.adminId;

export const getAdminPassword = state => state.loginReducer.adminPassword;

export const getSecretKey = state => state.loginReducer.adminPassword;
