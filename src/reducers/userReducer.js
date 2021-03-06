const initialState = {
  users: [],
  isUserCreated: false,
  searchFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_FROM_PHONE_SUCCESS':
      return {
        ...state,
        users: action.users,
        searchFailed: false,
      };
    case 'FETCH_USER_FROM_PHONE_FAILED':
      return {
        ...state,
        searchFailed: true,
      };
    case 'FETCH_USER_FROM_PHONE_FAILURE':
      return {
        ...state,
      };
    case 'DEFAULT_USER_STATE':
      return {
        ...initialState,
      };
    case 'STORE_SEARCH_PAGE_DATA':
      return {
        ...state,
        searchData: action.formData,
      };
    case 'USER_CREATED_SUCCESS_ACTION':
      return {
        ...state,
        isUserCreated: true,
      };
    case 'USER_CREATED_FAILED_ACTION':
      return {
        ...state,
        isUserFailed: true,
        errorMessage: action.error ? action.error.message : undefined,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export const getUsers = state => state.userReducer.users;

export const getSearchData = state => state.userReducer.searchData;

export const getIsUserCreated = state => state.userReducer.isUserCreated;

export const getIsUserFailed = state => state.userReducer.isUserFailed;

export const getIsSearchFailed = state => state.userReducer.searchFailed;

export const getErrorMessage = state => state.userReducer.errorMessage;
