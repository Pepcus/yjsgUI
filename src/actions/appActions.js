/**
 * setRedirectValueAction action will call when admin is login
 * or admin is logout
 * @param {Boolean} redirect
 * @return {{redirect: Boolean, type: String}}
 */
export const setRedirectValueAction = ({ redirect }) => ({
  type: 'SET_REDIRECT_VALUE',
  redirect,
});

/**
 * setAdminLoginStateAction action will call when admin is login
 * or logout
 * @param {Boolean} adminLoginState
 * @return {{adminLoginState: Boolean, type: String}}
 */
export const setAdminLoginStateAction = ({ adminLoginState }) => ({
  type: 'SET_ADMIN_LOGIN_STATE',
  adminLoginState,
});

/**
 * setVisibleColumnConfigAction action will
 * call when set the updated column option data in store
 * @param {Object} visibleColumnConfig
 * @param {Boolean} selectValue
 * @return {{visibleColumnConfig: Object, selectValue: Boolean, type: String}}
 */
export const setVisibleColumnConfigAction = ({ visibleColumnConfig, selectValue }) => ({
  type: 'SET_VISIBLE_COLUMN_CONFIG_DATA',
  visibleColumnConfig,
  selectValue,
});

/**
 * resetVisibleColumnConfigAction action will set the column option to initial state in store
 * on logout of admin
 * @return {{type: String}}
 */
export const resetVisibleColumnConfigAction = () => ({
  type: 'RESET_VISIBLE_COLUMN_CONFIG_DATA',
});

/**
 * setUserTypeAction action set the user type
 * @param {String} pageUser
 * @return {{pageUser: String, type: String}}
 */
export const setUserTypeAction = ({ pageUser }) => ({
  type: 'SET_USER_TYPE',
  pageUser,
});

/**
 * setHashLinkForMemberCredentialAction action will call when set user
 * type redirect to member registration correction form
 * @param {String} hashLink
 * @return {{hashLink: String, type: String}}
 */
export const setHashLinkForMemberCredentialAction = hashLink => ({
  type: 'SET_HASH_LINK_FOR_MEMBER_CREDENTIAL',
  hashLink,
});

/**
 * setHashLinkForNewRegistrationAction action will
 * call to set user type when redirect to new registration route
 * @param {String} userType
 * @return {{userType: String, type: String}}
 */
export const setHashLinkForNewRegistrationAction = userType => ({
  type: 'SET_HASH_LINK_FOR_NEW_REGISTRATION',
  userType,
});
