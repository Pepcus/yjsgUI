import isEmpty from 'lodash/isEmpty';

export const setRegistrationData = (value, name) => {
  let formData = {};
  formData[name] = value;
  return formData;
};

/**
 * returns the validating function on the basis of name of the input field.
 *
 * @param {String} value
 * @param {String} name
 * @returns {Object}
 */
export const validateInput = (value, name) => {
  if (name === 'name' || name === 'fatherName') {
     return nameValidate(value, name);
  }
  if (name === 'address') {
    return addressValidate(value, name);
  }
  if (name === 'email') {
    return optionalEmailValidate(value, name);
  }
  if (name === 'age') {
    return ageValidate(value, name);
  }
  if (name === 'mobile') {
    return mobileValidate(value, name);
  }
  if (name === 'motherMobile') {
    return optionalMobileValidate(value, name);
  }
  if (name === 'gender' || name === 'busStop'
    || name === 'classAttended2019' || name === 'optIn2019' ) {
    return requireFieldsValidate(value, name);
  }
  return null;
};

/**
 * Validates the email with the help of regex and return the error object containing the error message
 *
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const optionalEmailValidate = (value, name) => {
  let errorMessageObject = {};
  const emailRegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if(isEmpty(value)) {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  } else if (!emailRegExp.test(value)) {
    errorMessageObject['message'] = 'यह ई-मेल मान्य नहीं है ';
    errorMessageObject[`isValid_${name}`] = false;
  } else {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  }
  return errorMessageObject;
};

/**
 *
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const nameValidate = (value, name) => {
  let errorMessageObject = {};
  const nameRegExp = /^[a-zA-Z\s\.]+$/;

  if(isEmpty(value)) {
    errorMessageObject['message'] = 'यह जानकारी अनिवार्य है';
    errorMessageObject[`isValid_${name}`] = false;
  } else if (!nameRegExp.test(value)) {
    errorMessageObject['message'] = 'अमान्य नाम';
    errorMessageObject[`isValid_${name}`] = false;
  } else if (value.length < 3) {
    errorMessageObject['message'] = 'नाम ३ अक्षर से कम का मान्य नहीं';
    errorMessageObject[`isValid_${name}`] = false;
  } else {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  }
  return errorMessageObject;
};

/**
 *
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const addressValidate = (value, name) => {
  let errorMessageObject = {};

  if(isEmpty(value)) {
    errorMessageObject['message'] = 'यह जानकारी अनिवार्य है';
    errorMessageObject[`isValid_${name}`] = false;
  } else if (value.length < 15) {
    errorMessageObject['message'] = 'कृपया पूरा पता देंवे! यह जानकारी आपसे संपर्क करने में उपयोगी है!';
    errorMessageObject[`isValid_${name}`] = false;
  } else {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  }
  return errorMessageObject;
};

/**
 *
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const ageValidate = (value, name) => {
  let errorMessageObject = {};
  if(isEmpty(value)) {
    errorMessageObject['message'] = 'यह जानकारी अनिवार्य है';
    errorMessageObject[`isValid_${name}`] = false;
  } else if (value > 45 || value < 8) {
    errorMessageObject['message'] = 'केवल ८ - ४५ वर्ष तक ही मान्य';
    errorMessageObject[`isValid_${name}`] = false;
  } else {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  }
  return errorMessageObject;
};

/**
 *
 * @param {Number} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const mobileValidate = (value, name) => {
  let errorMessageObject = {};
  const mobileRegExp = /^[0-9]+$/;

  if(isEmpty(value)) {
    errorMessageObject['message'] = 'यह जानकारी अनिवार्य है';
    errorMessageObject[`isValid_${name}`] = false;
  } else if (value.length !== 10 ) {
    errorMessageObject['message'] = 'मोबाइल नं. केवल १० अंको का ही मान्य';
    errorMessageObject[`isValid_${name}`] = false;
  } else if (!mobileRegExp.test(value)) {
    errorMessageObject['message'] = 'मोबाइल नं. में केवल नंबर ही मान्य';
    errorMessageObject[`isValid_${name}`] = false;
  } else {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  }
  return errorMessageObject;
};

/**
 *
 * @param {Number} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const optionalMobileValidate = (value, name) => {
  let errorMessageObject = {};
  const mobileRegExp = /^[0-9]+$/;

  if(isEmpty(value)) {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  } else if (value.length !== 10 ) {
    errorMessageObject['message'] = 'मोबाइल नं. केवल १० अंको का ही मान्य';
    errorMessageObject[`isValid_${name}`] = false;
  } else if (!mobileRegExp.test(value)) {
    errorMessageObject['message'] = 'मोबाइल नं. में केवल नंबर ही मान्य';
    errorMessageObject[`isValid_${name}`] = false;
  } else {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  }
  return errorMessageObject;
};



/**
 *
 * @param {String} value
 * @param {String} name
 * @return {Object} errorMessageObject
 */
export const requireFieldsValidate = (value, name) => {
  let errorMessageObject = {};

  if (value === '' || value === null || value === undefined) {
    errorMessageObject['message'] = 'यह जानकारी अनिवार्य है';
    errorMessageObject[`isValid_${name}`] = false;
  } else {
    errorMessageObject['message'] = '';
    errorMessageObject[`isValid_${name}`] = true;
  }
  return errorMessageObject;
};

/**
 * checks errorMessageObject and return true if found isValid_name
 *
 * @param {Object} errorMessageObject
 * @return {boolean} isValid
 */
export const isValidUserInfo = (errorMessageObject) => {

  let isValid = false;
  if (errorMessageObject.name['isValid_name'] &&
    errorMessageObject.fatherName['isValid_fatherName'] &&
    errorMessageObject.age['isValid_age'] &&
    errorMessageObject.gender['isValid_gender'] &&
    errorMessageObject.mobile['isValid_mobile'] &&
    errorMessageObject.motherMobile['isValid_motherMobile'] &&
    errorMessageObject.email['isValid_email'] &&
    errorMessageObject.address['isValid_address'] &&
    errorMessageObject.busStop['isValid_busStop'] &&
    errorMessageObject.optIn2019['isValid_optIn2019'] &&
    errorMessageObject.classAttended2019['isValid_classAttended2019']
  ) {
    isValid = true;
  }
  return isValid;
};

export const isDataCorrect = (studentData) => {
  let errorMessageObject = {};
  for (let info in studentData) {
   errorMessageObject[info] = validateInput(studentData[info], info);
  }
  return errorMessageObject;
};

export const checkLevelValue = (value) => {
  let level = value ? value.slice(6, 8) : -1  ;
  return(Number(level));
};