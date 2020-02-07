import { getInitialVisibleColumnConfig } from 'utils/common';

const appReducerInitialState = {
  selectValue: true,
  visibleColumnConfig: [],
  pageUser: '',
};

export const appReducer = (state = appReducerInitialState, action) => {
  switch (action.type) {
    case 'SET_VISIBLE_COLUMN_OPTION_CONFIG_ACTION':
      return {
        ...state,
        visibleColumnConfig: getInitialVisibleColumnConfig({ ...action.gridMetaData }),
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
        visibleColumnConfig: appReducerInitialState.visibleColumnConfig,
        selectValue: appReducerInitialState.selectValue,
      };
    case 'SET_USER_TYPE':
      return {
        ...state,
        pageUser: action.pageUser,
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
    default: {
      return {
        ...state,
      };
    }
  }
};

export const stateOfRedirect = state => state.appReducer.redirect;

export const stateOfAdminLogin = state => state.appReducer.adminLoginState;

export const getVisibleColumnConfig = state => state.appReducer.visibleColumnConfig;

export const getSelectValue = state => state.appReducer.selectValue;

/**
 * getPageUserType return the user type
 * @param {Object} state
 * @return {string|String}
 */
export const getPageUserType = state => state.appReducer.pageUser;

export const getHash = state => state.appReducer.hashLink;

export const getUserType = state => state.appReducer.userType;
