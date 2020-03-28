export const fetchUserFromPhoneSuccess = users => ({
  type: 'FETCH_USER_FROM_PHONE_SUCCESS',
  users,
});

export const fetchUserFromPhoneFailed = () => ({
  type: 'FETCH_USER_FROM_PHONE_FAILED',
});

export const fetchUserFromPhoneAction = formData => ({
  type: 'FETCH_USER_FROM_PHONE_ACTION',
  formData,
});

export const setDefaultUserData = () => ({
  type: 'DEFAULT_USER_STATE',
});

export const storeSearchPageData = formData => ({
  type: 'STORE_SEARCH_PAGE_DATA',
  formData,
});

export const createUserAction = payload => ({
  type: 'CREATE_USER_ACTION',
  payload,
});

export const editUserAction = (payload, id) => ({
  type: 'UPDATE_USER_ACTION',
  payload,
  id,
});

export const patchUserAction = (payload, id) => ({
  type: 'PATCH_USER_ACTION',
  payload,
  id,
});

export const userCreateSuccessAction = () => ({
  type: 'USER_CREATED_SUCCESS_ACTION',
});

export const userCreateFailAction = (error) => ({
  type: 'USER_CREATED_FAILED_ACTION',
  error,
});
