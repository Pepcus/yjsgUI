/**
 * createMemberDataAction action will call when new member will create.
 * @param {Object} member
 * @return {{member: Object, type: string}}
 */
export const createMemberDataAction = member => ({
  type: 'CREATE_MEMBER',
  member,
});

/**
 * setMemberCredentialsAction call when new member is created,
 * or already member login with their credential.
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: String, id: String, type: string}}
 */
export const setMemberCredentialsAction = ({ id, secretKey }) => ({
  type: 'SET_MEMBER_CREDENTIALS',
  id,
  secretKey,
});

/**
 * createMemberSuccessAction action will call when
 * create member AIP response is success
 * @param {Object} newMember
 * @return {{newMember: Object, type: string}}
 */
export const createMemberSuccessAction = newMember => ({
  type: 'CREATE_MEMBER_SUCCESS',
  newMember,
});

/**
 * createMemberFailedAction action will call when
 * create member AIP response is fail
 * @param {String} message
 * @return {{type: string, message: String}}
 */
export const createMemberFailedAction = message => ({
  type: 'CREATE_MEMBER_FAILED',
  message,
});

export const partialMemberAlreadyRegisteredAction = () => ({
  type: 'PARTIAL_MEMBER_ALREADY_REGISTERED'
});

export const exactMemberAlreadyRegisteredAction = () => ({
  type: 'EXACT_MEMBER_ALREADY_REGISTERED'
});

export const clearAlreadyRegisteredMemberFlagsAction = () => ({
  type: 'CLEAR_ALREADY_REGISTERED_MEMBER_FLAGS'
});

/**
 * fetchMemberDataAction action will call when
 * member data will fetched
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: String, id: String, type: string}}
 */
export const fetchMemberDataAction = ({ id, secretKey }) => ({
  type: 'FETCH_MEMBER',
  id,
  secretKey,
});

/**
 * fetchMemberSuccessAction action will call when
 * fetch member data AIP response is success
 * @param {Object} member
 * @return {{member: Object, type: string}}
 */
export const fetchMemberSuccessAction = member => ({
  type: 'FETCH_MEMBER_SUCCESS',
  member,
});

/**
 * fetchMemberFailedAction action will call when
 * fetch member data AIP response is fail
 * @param {String} message
 * @return {{type: string, message: String}}
 */
export const fetchMemberFailedAction = message => ({
  type: 'FETCH_MEMBER_FAILED',
  message,
});

/**
 * updateMemberDataAction action will call when member data will updated.
 * @param {String} id
 * @param {String} secretKey
 * @param {Object} updatedMember
 * @return {{updatedMember: Object, secretKey: String, id: String, type: string}}
 */
export const updateMemberDataAction = ({ id, secretKey, member }) => ({
  type: 'UPDATE_MEMBER',
  id,
  secretKey,
  member,
});

/**
 * updateMemberSuccessAction action will call when
 * update member data AIP response is success
 * @param {Object} member
 * @return {{member: Object, type: string}}
 */
export const updateMemberSuccessAction = member => ({
  type: 'UPDATE_MEMBER_SUCCESS',
  member,
});

/**
 * updateMemberFailedAction action will call when
 * update member data AIP response is fail
 * @param {String} message
 * @return {{type: string, message: String}}
 */
export const updateMemberFailedAction = message => ({
  type: 'UPDATE_MEMBER_FAILED',
  message,
});

/**
 * setMemberDataAction action will call when click on edit button of particular row
 * in members grid
 * @param {Object} member
 * @return {{member: Object, isFetched: Boolean, type: String}}
 */
export const setMemberDataAction = ({ member }) => ({
  type: 'SET_MEMBER_DATA',
  member,
  isFetched: true,
});

/**
 * updateMemberByAdminAction action will call
 * when member data will update by admin
 * @param {String} id
 * @param {String} secretKey
 * @return {{secretKey: String, id: String, type: String}}
 */
export const updateMemberByAdminAction = ({ id, secretKey }) => ({
  type: 'UPDATE_MEMBER_BY_ADMIN',
  id,
  secretKey,
});

/**
 * isUpdatedResetAction action will call when reset the update information form store
 * @return {{secretKey: String, member: String, isUpdated: Boolean, id: String, type: String}}
 */
export const isUpdatedResetAction = () => ({
  type: 'RESET_IS_UPDATE',
  isUpdated: false,
  id: '',
  secretKey: '',
  member: '',
});

export const setMemberFetchedFromUrlParamsAction = () => ({
  type: 'SET_MEMBER_FETCHED_FROM_URL_PARAMS',
});

export const resetMemberFetchedFromUrlParamsAction = () => ({
  type: 'RESET_MEMBER_FETCHED_FROM_URL_PARAMS',
});

export const fetchMembersByMobileNumberAction = ({ mobile }) => ({
  type: 'FETCH_MEMBERS_BY_MOBILE_NUMBER',
  mobile,
});

export const fetchMembersByMobileNumberSuccessAction = ({ members }) => ({
  type: 'FETCH_MEMBERS_BY_MOBILE_NUMBER_SUCCESS',
  members,
});

export const fetchMembersByMobileNumberFailedAction = ({ errorMessage }) => ({
  type: 'FETCH_MEMBERS_BY_MOBILE_NUMBER_FAILED',
  errorMessage,
});

export const updateMembersOptInStatusAction = ({ optedInMembersIds, notOptedInMembersIds }) => ({
  type: 'UPDATE_MEMBERS_OPT_IN_STATUS',
  optedInMembersIds,
  notOptedInMembersIds,
});

export const updateMembersOptInStatusSuccessAction = () => ({
  type: 'UPDATE_MEMBERS_OPT_IN_STATUS_SUCCESS',
});

export const updateMembersOptInStatusFailedAction = ({ errorMessage }) => ({
  type: 'UPDATE_MEMBERS_OPT_IN_STATUS_FAILED',
  errorMessage,
});

export const resetMemberOptInStatusDataAction = () => ({
  type: 'RESET_MEMBER_OPT_IN_STATUS_DATA',
});

export const setMemberRegistrationCorrectionModeAction = ({ mode }) => ({
  type: 'SET_MEMBER_REGISTRATION_CORRECTION_MODE',
  mode,
});
