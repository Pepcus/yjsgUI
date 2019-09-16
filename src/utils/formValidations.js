/* eslint-disable no-useless-escape,security/detect-unsafe-regex */
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
export const nameValidator = (value) => {

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
 * ageValidator method check validations for age field of form
 * @param {number} value
 * @return {string} message
 */
export const ageValidator = (value) => {

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
 * mobileValidator method check validations for mobile field of form
 * @param {Number} value
 * @return {string} message
 */
export const mobileValidator = (value) => {

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
 * optionalMobileValidator method check validations for optional mobile field of form
 * @param {Number} value
 * @return {string} message
 */
export const optionalMobileValidator = (value) => {

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
 * optionalEmailValidator method check validations for email field of form
 * @param {String} value
 * @return {string} message
 */
export const optionalEmailValidator = (value) => {

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
 * addressValidator method check validations for address field of form
 * @param {String} value
 * @return {string} message
 */
export const addressValidator = (value) => {

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
export const bhopalAgeValidator = (value) => {

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

    const nameError = nameValidator(formData.name);

    if (!isEmpty(nameError)) {
      errors.name.addError(nameError);
    }

    const fatherNameError = nameValidator(formData.fatherName);

    if (!isEmpty(fatherNameError)) {
      errors.fatherName.addError(fatherNameError);
    }

    const ageError = ageValidator(formData.age ? String(formData.age) : '');

    if (!isEmpty(ageError)) {
      errors.age.addError(ageError);
    }

    const mobileError = mobileValidator(formData.mobile ? String(formData.mobile) : '');

    if (!isEmpty(mobileError)) {
      errors.mobile.addError(mobileError);
    }

    const emailError = optionalEmailValidator(formData.email);

    if (!isEmpty(emailError)) {
      errors.email.addError(emailError);
    }

    const addressError = addressValidator(formData.address);

    if (!isEmpty(addressError)) {
      errors.address.addError(addressError);
    }

    const optionalMobileError = optionalMobileValidator(formData.motherMobile ? String(formData.motherMobile) : '');

    if (!isEmpty(optionalMobileError)) {
      errors.motherMobile.addError(optionalMobileError);
    }

    return errors;
  }
  return {};
};

/**
 * prePopulateOptIn method pre populate the optIn value
 * @param {Object} memberData
 * @return {Object} memberData
 */
export const prePopulateOptIn = ({ memberData }) => {

  let updatedMemberData = memberData;

  if (memberData) {

    const {
      optIn2019,
    } = memberData;

    updatedMemberData = {
      ...memberData,
      optIn2019: !optIn2019 ? 'Y' : optIn2019,
    };
  }
  return updatedMemberData;
};

/**
 * Method format the form data into corresponding data type
 * @param {Object} memberData
 * @param {Object} formConfig
 * @return {Object}
 * @constructor formattedMemberData
 */
export const initialMemberData = ({ memberData, formConfig }) => {
  let formattedMemberData = cloneDeep(memberData);
  formConfig.defaultStudentDataFormat.forEach((fieldObject) => {
    if (formattedMemberData[fieldObject.formField] === null) {
      const property = [fieldObject.formField];

      delete formattedMemberData[property];

    } else if (fieldObject.dataType === 'string') {
      formattedMemberData = {
        ...formattedMemberData,
        [fieldObject.formField]: String(formattedMemberData[fieldObject.formField]) };

    } else if (fieldObject.dataType === 'number') {
      formattedMemberData = {
        ...formattedMemberData,
        [fieldObject.formField]: Number(formattedMemberData[fieldObject.formField]) };
    }
  });

  return formattedMemberData;
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