/**
 * parentsRegistrationAction action will call when submit form of parents registration
 * @param {String} name
 * @param {Number} members
 * @param {String} phoneNumber
 * @return {{phoneNumber: String, members: Number, name: String, type: String}}
 */
export const parentsRegistrationAction = ({ name, members, phoneNumber }) => ({
  type: 'PARENTS_REGISTRATION',
  name,
  members,
  phoneNumber,
});

/**
 * parentsRegistrationResultsSuccessAction action will call
 * when parents registration AIP response is success
 * @param {Object} response
 * @return {{response: Object, type: String}}
 */
export const parentsRegistrationResultsSuccessAction = response => ({
  type: 'PARENTS_REGISTRATION_RESULT_SUCCESS',
  response,
});

/**
 * parentsRegistrationResultsFailureAction action will call
 * when parents registration AIP response is fail
 * @param {String} message
 * @return {{type: String, message: String}}
 */
export const parentsRegistrationResultsFailureAction = message => ({
  type: 'PARENTS_REGISTRATION_RESULT_FAILED',
  message,
});
