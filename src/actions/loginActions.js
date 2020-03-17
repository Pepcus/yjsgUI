export const loginAdminAction = ({ adminId, adminPassword, preStoredAdminCredentials }) => ({
  type: 'ADMIN_LOGIN',
  adminId,
  adminPassword,
  preStoredAdminCredentials,
});

export const loginAdminSuccessAction = () => ({
  type: 'ADMIN_LOGIN_SUCCESS',
});

export const loginAdminFailureAction = () => ({
  type: 'ADMIN_LOGIN_FAIL',
});

export const resetLoginAdminStateAction = () => ({
  type: 'RESET_LOGIN_ADMIN_STATE',
});

/**
 * setAdminCredentialsAction action will call
 * when admin login with their credential
 * @param {String} id
 * @param {String} password
 * @return {{password: String, id: String, type: string}}
 */
export const setAdminCredentialsAction = ({ id, password }) => ({
  type: 'SET_ADMIN_CREDENTIALS',
  id,
  password,
});

/**
 * resetAdminCredentialsAction action will call
 * when admin logout.
 * @return {{type: string}}
 */
export const resetAdminCredentialsAction = () => ({
  type: 'RESET_ADMIN_CREDENTIALS',
});
