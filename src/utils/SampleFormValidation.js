/* eslint-disable no-useless-escape */
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';


import {
  DOUBLE_QUOTE_ERROR_MESSAGE,
  FULL_ADDRESS_MESSAGE,
  INFORMATION_HELPFUL_TO_CONTACT_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  INVALID_NAME_MESSAGE,
  NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE,
  ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE,
  ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE,
  ONLY_VALID_FOR_5_TO_66_YEARS_MESSAGE,
  ONLY_VALID_FOR_8_TO_45_YEARS_MESSAGE,
  SINGLE_QUOTE_ERROR_MESSAGE,
} from '../constants/messages';

/**
 * nameValidate method check validations for name field of form
 * @param {String} value
 * @return {string} message
 */
export const nameValidation = (value) => {

  const nameRegExp = /^[a-zA-Z\s\.]+$/;
  let message = '';

  if (isEmpty(value)) {
    message = '';

  } else if (!nameRegExp.test(value)) {
    message = INVALID_NAME_MESSAGE;

  } else if (value.length < 3) {
    message = NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * ageValidation method check validations for age field of form
 * @param {number} value
 * @return {string} message
 */
export const ageValidation = (value) => {

  const temporaryValue = !value ? null : String(value);
  let message = '';

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (temporaryValue > 45 || temporaryValue < 8) {
    message = ONLY_VALID_FOR_8_TO_45_YEARS_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * mobileValidation method check validations for mobile field of form
 * @param {Number} value
 * @return {string} message
 */
export const mobileValidation = (value) => {

  const temporaryValue = !value ? null : String(value);
  let message = '';
  const mobileRegExp = /^[0-9]+$/;

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (temporaryValue.length !== 10) {
    message = ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE;

  } else if (!mobileRegExp.test(temporaryValue)) {
    message = ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * optionalMobileValidation method check validations for optional mobile field of form
 * @param {Number} value
 * @return {string} message
 */
export const optionalMobileValidation = (value) => {

  let message = '';
  const mobileRegExp = /^[0-9]+$/;

  if (isEmpty(value)) {
    message = '';

  } else if (value.length !== 10) {
    message = ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE;

  } else if (!mobileRegExp.test(value)) {
    message = ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * optionalEmailValidation method check validations for email field of form
 * @param {String} value
 * @return {string} message
 */
export const optionalEmailValidation = (value) => {

  let message = '';
  const emailRegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (isEmpty(value)) {
    message = '';

  } else if (!emailRegExp.test(value)) {
    message = INVALID_EMAIL_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * addressValidation method check validations for address field of form
 * @param {String} value
 * @return {string} message
 */
export const addressValidation = (value) => {

  let message = '';

  if (isEmpty(value)) {
    message = '';

  } else if (value.includes("'")) {
    message = SINGLE_QUOTE_ERROR_MESSAGE;

  } else if (value.includes('"')) {
    message = DOUBLE_QUOTE_ERROR_MESSAGE;

  } else if (value.length < 15) {
    message = FULL_ADDRESS_MESSAGE + INFORMATION_HELPFUL_TO_CONTACT_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * bhopalAgeValidate method check validations for age field of form for Bhopal tenant
 * @param {Number} value
 * @return {string} message
 */
export const bhopalAgeValidate = (value) => {

  let message = '';

  if (isEmpty(value)) {
    message = '';

  } else if (value > 66 || value < 5) {
    message = ONLY_VALID_FOR_5_TO_66_YEARS_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * validates method check validation of form fields and return errors object
 * @param {Object} formData
 * @param {Object} errors
 * @return {Object} errors
 */
export const validates = (formData, errors) => {
  if (formData.optIn2019 === 'Y') {

    const nameError = nameValidation(formData.name);

    if (!isEmpty(nameError)) {
      errors.name.addError(nameError);
    }

    const fatherNameError = nameValidation(formData.fatherName);

    if (!isEmpty(fatherNameError)) {
      errors.fatherName.addError(fatherNameError);
    }

    const ageError = ageValidation(formData.age ? String(formData.age) : '');

    if (!isEmpty(ageError)) {
      errors.age.addError(ageError);
    }

    const mobileError = mobileValidation(formData.mobile ? String(formData.mobile) : '');

    if (!isEmpty(mobileError)) {
      errors.mobile.addError(mobileError);
    }

    const emailError = optionalEmailValidation(formData.email);

    if (!isEmpty(emailError)) {
      errors.email.addError(emailError);
    }

    const addressError = addressValidation(formData.address);

    if (!isEmpty(addressError)) {
      errors.address.addError(addressError);
    }

    const optionalMobileError = optionalMobileValidation(formData.motherMobile ? String(formData.motherMobile) : '');

    if (!isEmpty(optionalMobileError)) {
      errors.motherMobile.addError(optionalMobileError);
    }

    return errors;
  }
  return {};
};

/**
 * prePopulateOptIn method pre populate the optIn value
 * @param {Object} studentData
 * @return {Object} studentData
 */
export const prePopulateOptIn = (studentData) => {

  let updatedStudentData = studentData;

  if (studentData) {

    const {
      optIn2019,
    } = studentData;

    updatedStudentData = {
      ...studentData,
      optIn2019: !optIn2019 ? 'Y' : optIn2019,
    };
  }
  return updatedStudentData;
};

/**
 * InitialStudentData method format the form data into corresponding data type
 * @param {Object} studentData
 * @param {Object} fileData
 * @return {Object}
 * @constructor formattedStudentData
 */
export const InitialStudentData = ({ studentData, fileData }) => {
  let formattedStudentData = cloneDeep(studentData);
  fileData.defaultStudentDataFormat.forEach((fieldObject) => {

    if (formattedStudentData[fieldObject.formField] === null) {
      const property = [fieldObject.formField];

      delete formattedStudentData[property];

    } else if (fieldObject.dataType === 'string') {
      formattedStudentData = {
        ...formattedStudentData,
        [fieldObject.formField]: String(formattedStudentData[fieldObject.formField]) };

    } else if (fieldObject.dataType === 'number') {
      formattedStudentData = {
        ...formattedStudentData,
        [fieldObject.formField]: Number(formattedStudentData[fieldObject.formField]) };
    }
  });

  return formattedStudentData;
};

/**
 * compare two objects
 * @param {Object} object1
 * @param {Object} object2
 * @return {boolean}
 */
export const isObjectsEqual = ({ object1, object2 }) => {
  const finalKeys = _.uniq([...Object.keys(object1), ...Object.keys(object2)]);
  let isEqualObject = true;

  for (const key in finalKeys) {
    if (object1[finalKeys[key]] !== object2[finalKeys[key]]) {
      isEqualObject = false;
    }
  }
  return isEqualObject;
};
