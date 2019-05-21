import isEmpty from 'lodash/isEmpty';
import {
  DOUBLE_QUOTE_ERROR_MESSAGE, FULL_ADDRESS_MESSAGE, INFORMATION_HELPFUL_TO_CONTACT_MESSAGE, INVALID_EMAIL_MESSAGE,
  INVALID_NAME_MESSAGE,
  NAME_LESS_THAN_THREE_CHARACTERS_NOT_VALID_MESSAGE, ONLY_NUMBER_IS_VALID_IN_MOBILE_NUMBER_MESSAGE,
  ONLY_TEN_DIGITS_ARE_VALID_IN_MOBILE_NUMBER_MESSAGE, ONLY_VALID_FOR_5_TO_66_YEARS_MESSAGE,
  ONLY_VALID_FOR_8_TO_45_YEARS_MESSAGE, SINGLE_QUOTE_ERROR_MESSAGE, THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from '../constants/messages';

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

export const addressValidation = (value) => {
  let message = '';
  if (isEmpty(value)) {
    message = '';
  } else if (value.includes("'")) {
    message = SINGLE_QUOTE_ERROR_MESSAGE;
  } else if (value.includes('"')) {
    message = DOUBLE_QUOTE_ERROR_MESSAGE;
  } else if (value.length < 15) {
    message = FULL_ADDRESS_MESSAGE+INFORMATION_HELPFUL_TO_CONTACT_MESSAGE;
  } else {
    message = '';
  }
  return message;
};

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
  return [];
};
