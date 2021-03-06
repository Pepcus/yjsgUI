/* eslint-disable no-useless-escape,security/detect-unsafe-regex */
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { convertAgeToNumeric } from 'utils/common/string';

export const numberOfPeopleValidator = (value, constants) => {
  const { MEMBERS_MUST_BE_GREATER_THAN_ZERO, MEMBERS_MUST_BE_LESS_THAN_SIX } = constants;
  let message = '';

  if (isEmpty(value)) {
    message = '';

  } else if (Number(value) < 1) {
    message = MEMBERS_MUST_BE_GREATER_THAN_ZERO;

  } else if (Number(value) > 5) {
    message = MEMBERS_MUST_BE_LESS_THAN_SIX;

  } else {
    message = '';
  }

  return message;
};

/**
 * nameValidate method check validations for name field of form
 * @param {String} value
 * @param {Object} constants
 * @return {string} message
 */
export const nameValidator = (value, constants) => {
  const { INVALID_NAME_MESSAGE, NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE } = constants;
  const nameRegExp = /^[a-zA-Z\s\.]+$/;
  let message = '';
  let updatedValue = '';

  if (value) {
    updatedValue = value.trim();
  }
  if (isEmpty(value)) {
    message = '';

  } else if (!nameRegExp.test(updatedValue)) {
    message = INVALID_NAME_MESSAGE;

  } else if (updatedValue.length < 3) {
    message = NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * nameCoordinatorValidate method check validations for name field of form
 * @param {String} value
 * @param {Object} constants
 * @return {string} message
 */
export const nameCoordinatorValidator = (value, constants) => {
  const { INVALID_NAME_MESSAGE_COORDINATOR, NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE_COORDINATOR } = constants;
  const nameRegExp = /^[a-zA-Z\s\.]+$/;
  let message = '';

  if (isEmpty(value)) {
    message = '';

  } else if (!nameRegExp.test(value)) {
    message = INVALID_NAME_MESSAGE_COORDINATOR;

  } else if (value.length < 3) {
    message = NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE_COORDINATOR;

  } else {
    message = '';
  }

  return message;
};

/**
/**
 * cityValidate method check validations for name field of form
 * @param {String} value
 * @param {Object} constants
 * @return {string} message
 */
export const cityValidator = (value, constants) => {
  const { INVALID_CITY_MESSAGE } = constants;
  let message = '';
  let updatedValue = '';

  if (value) {
    updatedValue = value.trim();
  }
  if (isEmpty(value)) {
    message = '';

  } else if (updatedValue.length < 2) {
    message = INVALID_CITY_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * ageValidator method check validations for age field of form
 * @param {number} value
 * @param {Object} constants
 * @return {string} message
 */
export const ageValidator = (value, constants) => {
  const { ONLY_VALID_FOR_8_TO_45_YEARS_MESSAGE, ONLY_NUMBERS_ALLOWED_MESSAGE } = constants;
  const temporaryValue = !value ? null : String(value);
  let message = '';

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (temporaryValue > 45 || temporaryValue < 8) {
    message = ONLY_VALID_FOR_8_TO_45_YEARS_MESSAGE;

  } else if (isNaN(temporaryValue)) {
    message = ONLY_NUMBERS_ALLOWED_MESSAGE;
  } else {
    message = '';
  }

  return message;
};

/**
 * mobileValidator method check validations for mobile field of form
 * @param {Number} value
 * @param {Object} constants
 * @return {string} message
 */
export const mobileValidator = (value, constants) => {
  const {
    ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE,
    ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE,
  } = constants;
  const temporaryValue = !value ? null : String(value);
  let message = '';
  const mobileRegExp = /^[0-9]+$/;

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (!mobileRegExp.test(temporaryValue)) {
    message = ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE;

  } else if (temporaryValue.length !== 10) {
    message = ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * mobileCoordinatorValidator method check validations for mobile field of form
 * @param {Number} value
 * @param {Object} constants
 * @return {string} message
 */
export const mobileCoordinatorValidator = (value, constants) => {
  const {
    ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE_COORDINATOR,
    ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE_COORDINATOR,
  } = constants;
  const temporaryValue = !value ? null : String(value);
  let message = '';
  const mobileRegExp = /^[0-9]+$/;

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (temporaryValue.length !== 10) {
    message = ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE_COORDINATOR;

  } else if (!mobileRegExp.test(temporaryValue)) {
    message = ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE_COORDINATOR;

  } else {
    message = '';
  }

  return message;
};

/**
 * dobCoordinatorValidator method check validations for dob field of form
 * @param {Number} value
 * @param {Object} constants
 * @return {string} message
 */
export const dobCoordinatorValidator = (value, constants) => {
  const {
    ENTER_A_VALID_DOB_MESSAGE,
  } = constants;
  const temporaryValue = !value ? null : String(value);
  let message = '';

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (moment(temporaryValue, 'DD/MM/YYYY').isAfter(new Date()) ||
    !moment(temporaryValue, 'DD/MM/YYYY', true).isValid() ||
    temporaryValue.length > 10
  ) {
    message = ENTER_A_VALID_DOB_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

/**
 * optionalMobileValidator method check validations for optional mobile field of form
 * @param {Number} value
 * @param {Object} constants
 * @return {string} message
 */
export const optionalMobileValidator = (value, constants) => {
  const { ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE, ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE } = constants;
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
 * @param {Object} constants
 * @return {string} message
 */
export const optionalEmailValidator = (value, constants) => {
  const { INVALID_EMAIL_MESSAGE } = constants;
  let message = '';
  const emailRegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;

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
 * optionalEmailCoordinatorValidator method check validations for email field of form
 * @param {String} value
 * @param {Object} constants
 * @return {string} message
 */
export const optionalEmailCoordinatorValidator = (value, constants) => {
  const { INVALID_EMAIL_MESSAGE_COORDINATOR } = constants;
  let message = '';
  const emailRegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (isEmpty(value)) {
    message = '';

  } else if (!emailRegExp.test(value)) {
    message = INVALID_EMAIL_MESSAGE_COORDINATOR;

  } else {
    message = '';
  }

  return message;
};

/**
 * addressValidator method check validations for address field of form
 * @param {String} value
 * @param {Object} constants
 * @return {string} message
 */
export const addressValidator = (value, constants) => {
  const {
    SINGLE_QUOTE_ERROR_MESSAGE,
    DOUBLE_QUOTE_ERROR_MESSAGE,
    FULL_ADDRESS_MESSAGE,
    INFORMATION_HELPFUL_TO_CONTACT_MESSAGE,
  } = constants;
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
 * addressCoordinatorValidator method check validations for address field of form
 * @param {String} value
 * @param {Object} constants
 * @return {string} message
 */
export const addressCoordinatorValidator = (value, constants) => {
  const {
    SINGLE_QUOTE_ERROR_MESSAGE_COORDINATOR,
    DOUBLE_QUOTE_ERROR_MESSAGE_COORDINATOR,
    FULL_ADDRESS_MESSAGE_COORDINATOR,
    INFORMATION_HELPFUL_TO_CONTACT_MESSAGE_COORDINATOR,
  } = constants;
  let message = '';

  if (isEmpty(value)) {
    message = '';

  } else if (value.includes("'")) {
    message = SINGLE_QUOTE_ERROR_MESSAGE_COORDINATOR;

  } else if (value.includes('"')) {
    message = DOUBLE_QUOTE_ERROR_MESSAGE_COORDINATOR;

  } else if (value.length < 15) {
    message = FULL_ADDRESS_MESSAGE_COORDINATOR + INFORMATION_HELPFUL_TO_CONTACT_MESSAGE_COORDINATOR;

  } else {
    message = '';
  }

  return message;
};

/**
 * bhopalAgeValidate method check validations for age field of form for Bhopal tenant
 * @param {Number} value
 * @param {Object} constants
 * @return {string} message
 */
export const bhopalAgeValidator = (value, constants) => {
  const { ONLY_VALID_FOR_5_TO_66_YEARS_MESSAGE } = constants;
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
 * prePopulateOptIn method pre populate the optIn value
 * @param {Object} memberData
 * @return {Object} memberData
 */
export const prePopulateOptIn = ({ memberData }) => {

  let updatedMemberData = memberData;

  if (memberData) {

    const {
      optIn2021,
    } = memberData;

    updatedMemberData = {
      ...memberData,
      optIn2020: !optIn2021 ? 'Y' : optIn2021,
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
  formConfig.defaultMemberDataFormat.forEach((fieldObject) => {
    if (formattedMemberData[fieldObject.formField] === null) {
      const property = [fieldObject.formField];
      delete formattedMemberData[property];

    } else if (fieldObject.dataType === 'string' && formattedMemberData[fieldObject.formField] !== undefined) {
      formattedMemberData = {
        ...formattedMemberData,
        [fieldObject.formField]: String(formattedMemberData[fieldObject.formField]) };

    } else if (fieldObject.dataType === 'number' && formattedMemberData[fieldObject.formField] !== undefined) {
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

export const ageValidatorWithNoUpperLimit = (value, constants) => {
  const { ONLY_VALID_FOR_8_AND_ABOVE_YEARS_MESSAGE, ONLY_NUMBERS_ALLOWED_MESSAGE } = constants;
  let temporaryValue = !value ? null : String(value);
  let message = '';

  if (!isEmpty(temporaryValue)) {
    temporaryValue = convertAgeToNumeric(temporaryValue);
  }

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (temporaryValue < 8) {
    message = ONLY_VALID_FOR_8_AND_ABOVE_YEARS_MESSAGE;

  } else if (isNaN(temporaryValue)) {
    message = ONLY_NUMBERS_ALLOWED_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

export const onlyNumbersAllowed = (value, constants) => {
  const { ONLY_NUMBERS_ALLOWED_MESSAGE } = constants;
  let temporaryValue = !value ? null : String(value);
  let message = '';

  if (!isEmpty(temporaryValue)) {
    temporaryValue = convertAgeToNumeric(temporaryValue);
  }

  if (isEmpty(temporaryValue)) {
    message = '';

  } else if (isNaN(temporaryValue)) {
    message = ONLY_NUMBERS_ALLOWED_MESSAGE;

  } else {
    message = '';
  }

  return message;
};

export const blankValidator = (value, constants) => {
  const { INVALID_ADDRESS_MESSAGE } = constants;
  let message = '';
  let updatedValue = '';

  if (value) {
    updatedValue = value.trim();
  }
  if (isEmpty(value)) {
    message = '';

  } else if (updatedValue.length < 5) {
    message = INVALID_ADDRESS_MESSAGE;

  } else {
    message = '';
  }

  return message;
};
