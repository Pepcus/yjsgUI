import isEmpty from 'lodash/isEmpty';
import extend from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep';

import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_NAME_MESSAGE,
  NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE,
  FULL_ADDRESS_MESSAGE,
  INFORMATION_HELPFUL_TO_CONTACT_MESSAGE,
  ONLY_VALID_FOR_8_TO_45_YEARS_MESSAGE,
  ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE,
  ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE,
  SINGLE_QUOTE_ERROR_MESSAGE,
  DOUBLE_QUOTE_ERROR_MESSAGE, ONLY_VALID_FOR_5_TO_66_YEARS_MESSAGE,
} from '../constants/messages';
import { TENANT } from '../constants/yjsg';

/**
 * setRegistrationData method set form field data in key value pair format
 * @param {String} value
 * @param {String} name
 * @return {Object} formData
 */
export const setRegistrationData = (value, name) => {

  const formData = {};

  formData[name] = value;
  return formData;
};

/**
 * Validates the email with the help of regex and return the error object containing the error message
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const optionalEmailValidate = (value, name) => {

  const errorMessageObject = {};
  const emailRegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (isEmpty(value)) {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;

  } else if (!emailRegExp.test(value)) {
    errorMessageObject.message = INVALID_EMAIL_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};

/**
 * nameValidate method check validations for name form field
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const nameValidate = (value, name) => {

  const errorMessageObject = {};
  const nameRegExp = /^[a-zA-Z\s\.]+$/;

  if (isEmpty(value)) {
    errorMessageObject.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (!nameRegExp.test(value)) {
    errorMessageObject.message = INVALID_NAME_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (value.length < 3) {
    errorMessageObject.message = NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};

/**
 * addressValidate method check validations for address form field
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const addressValidate = (value, name) => {

  const errorMessageObject = {};

  if (isEmpty(value)) {
    errorMessageObject.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (value.includes("'")) {
    errorMessageObject.message = SINGLE_QUOTE_ERROR_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (value.includes('"')) {
    errorMessageObject.message = DOUBLE_QUOTE_ERROR_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (value.length < 15) {
    errorMessageObject.message = FULL_ADDRESS_MESSAGE + INFORMATION_HELPFUL_TO_CONTACT_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};

/**
 * ageValidate method check validations for age form field
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const ageValidate = (value, name) => {

  const errorMessageObject = {};

  if (isEmpty(value)) {
    errorMessageObject.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (value > 45 || value < 8) {
    errorMessageObject.message = ONLY_VALID_FOR_8_TO_45_YEARS_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};

/**
 * ageValidateForBhopal method check validations for age form field in Bhopal tenant case
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const ageValidateForBhopal = (value, name) => {

  const errorMessageObject = {};

  if (isEmpty(value)) {
    errorMessageObject.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (value > 66 || value < 5) {
    errorMessageObject.message = ONLY_VALID_FOR_5_TO_66_YEARS_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};

/**
 * mobileValidate method check validations for mobile number form field
 * @param {Number} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const mobileValidate = (value, name) => {

  const errorMessageObject = {};
  const mobileRegExp = /^[0-9]+$/;

  if (isEmpty(value)) {
    errorMessageObject.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (value.length !== 10) {
    errorMessageObject.message = ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (!mobileRegExp.test(value)) {
    errorMessageObject.message = ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};

/**
 * optionalMobileValidate method check validations for optional mobile number form field
 * @param {Number} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const optionalMobileValidate = (value, name) => {

  const errorMessageObject = {};
  const mobileRegExp = /^[0-9]+$/;

  if (isEmpty(value)) {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;

  } else if (value.length !== 10) {
    errorMessageObject.message = ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else if (!mobileRegExp.test(value)) {
    errorMessageObject.message = ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};


/**
 * requireFieldsValidate method check validations for form field which are required
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const requireFieldsValidate = (value, name) => {

  const errorMessageObject = {};

  if (!value) {
    errorMessageObject.message = THIS_INFORMATION_IS_COMPULSORY_MESSAGE;
    errorMessageObject[`isValid_${name}`] = false;

  } else {
    errorMessageObject.message = '';
    errorMessageObject[`isValid_${name}`] = true;
  }

  return errorMessageObject;
};

/**
 * checks errorMessageObject and return true if found isValid_name
 * @param {Object} errorMessageObject
 * @param {String} user
 * @param {String} tenant
 * @return {boolean} isValid
 */
export const isValidUserInfo = ({ errorMessageObject, user, tenant }) => {

  let isValid = false;

  if (user === 'admin' && tenant === TENANT.INDORE) {
    if (errorMessageObject.name.isValid_name
      && errorMessageObject.fatherName.isValid_fatherName
      && errorMessageObject.age.isValid_age
      && errorMessageObject.gender.isValid_gender
      && errorMessageObject.mobile.isValid_mobile
      && errorMessageObject.email.isValid_email
      && errorMessageObject.address.isValid_address
      && errorMessageObject.busStop.isValid_busStop
    ) {
      isValid = true;
    }

  } else if (user === 'admin' && tenant === TENANT.BHOPAL) {
    if (errorMessageObject.name.isValid_name
      && errorMessageObject.fatherName.isValid_fatherName
      && errorMessageObject.age.isValid_age
      && errorMessageObject.gender.isValid_gender
      && errorMessageObject.mobile.isValid_mobile
      && errorMessageObject.email.isValid_email
      && errorMessageObject.address.isValid_address
    ) {
      isValid = true;
    }

  } else if (tenant === TENANT.BHOPAL) {
    if (errorMessageObject.name.isValid_name
      && errorMessageObject.fatherName.isValid_fatherName
      && errorMessageObject.age.isValid_age
      && errorMessageObject.gender.isValid_gender
      && errorMessageObject.mobile.isValid_mobile
      && errorMessageObject.email.isValid_email
      && errorMessageObject.address.isValid_address
      && errorMessageObject.optIn2019.isValid_optIn2019
      && errorMessageObject.classAttended2019.isValid_classAttended2019
    ) {
      isValid = true;
    }

  } else if (errorMessageObject.name.isValid_name
    && errorMessageObject.fatherName.isValid_fatherName
    && errorMessageObject.age.isValid_age
    && errorMessageObject.gender.isValid_gender
    && errorMessageObject.mobile.isValid_mobile
    && errorMessageObject.email.isValid_email
    && errorMessageObject.address.isValid_address
    && errorMessageObject.busStop.isValid_busStop
    && errorMessageObject.optIn2019.isValid_optIn2019
    && errorMessageObject.classAttended2019.isValid_classAttended2019
  ) {
    isValid = true;
  }

  return isValid;
};

/**
 * returns the validating function on the basis of name of the input field.
 * @param {String} value
 * @param {String} name
 * @param {String} tenant
 * @return {Object}
 */
export const validateInput = ({ value, name, tenant }) => {
  if (name === 'name' || name === 'fatherName') {
    return nameValidate(value, name);
  }

  if (name === 'address') {
    return addressValidate(value, name);
  }

  if (name === 'email') {
    return optionalEmailValidate(value, name);
  }

  if (name === 'age' && tenant === TENANT.INDORE) {
    return ageValidate(value, name);
  }

  if (name === 'age' && tenant === TENANT.BHOPAL) {
    return ageValidateForBhopal(value, name);
  }

  if (name === 'mobile') {
    return mobileValidate(value, name);
  }

  if (name === 'gender' || name === 'classAttended2019' || name === 'optIn2019') {
    return requireFieldsValidate(value, name);
  }

  if (name === 'busStop' && tenant === TENANT.INDORE) {
    return requireFieldsValidate(value, name);
  }

  return null;
};

/**
 * isDataCorrect method return errorObject of student data fields
 * @param {Object} studentData
 * @param {String} tenant
 * @return {Object} errorMessageObject
 */
export const isDataCorrect = (studentData, tenant) => {

  const errorMessageObject = {};

  for (const info in studentData) {
    errorMessageObject[info] = validateInput({ value: studentData[info], name: info, tenant });
  }

  return errorMessageObject;
};

/**
 * checkLevelValue method check level value and return it into number type
 * @param {String} value
 * @return {number}
 */
export const checkLevelValue = (value) => {

  const level = value ? value.slice(6, 8) : -1;

  return (Number(level));
};

/**
 * updateStudentDataAccordingClassAttended2018Level method manipulate the student data
 * according to classAttended level value of previous year.
 * @param {Object} studentData
 * @return {Object} studentData
 */
export const updateClassAttended2019InStudentData = (studentData) => {

  const { classAttended2018, classAttended2019 } = studentData;

  if (classAttended2019) {
    return studentData;
  }

  const lastCourse = classAttended2018;
  const level = checkLevelValue(lastCourse);

  /* In classAttended2018 Level is greater than 0 (level > 0) condition will satisfied.*/
  if (level > 0) {
    // In classAttended2018 Level is greater than 7 like 'Level 8'
    // in that condition will pre populate
    // the value of classAttended2019 is 'Level 8'.
    if (level > 7) {
      return extend(cloneDeep(studentData), { classAttended2019: 'Level 8' });
    }
    // In classAttended2018 Level is greater than 0 and less than 8 in that condition
    // pre populate value of classAttended2019 will be classAttended2018 incremented by 1.
    return extend(cloneDeep(studentData), { classAttended2019: `Level ${level + 1}` });

  } else if (!isEmpty(lastCourse)) {
    // If classAttended2018 value is anything else then Level classAttended2019 will be Level 1.
    return extend(cloneDeep(studentData), { classAttended2019: 'Level 1' });
  }

  return studentData;
};

export const getFinalMemberData = ({ studentData }) => {
  // get student data from session if present
  const studentDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
  return !isEmpty(studentData) ? studentData : studentDataFromSession;
};
