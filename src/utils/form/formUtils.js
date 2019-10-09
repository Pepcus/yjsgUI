import isEmpty from 'lodash/isEmpty';

import * as validationTypes from 'utils/validations';

/**
 * Method return transformErrors function
 * @param {Array} errors
 * @param {Function} transformErrors
 * @return {Array} errors
 */

export const getTransformedErrors = ({ errors, transformErrors }) => {
  const transformErrorObject = transformErrors;
  const transformedErrors = [];

  if (!isEmpty(transformErrorObject)) {
    errors.forEach((error) => {
      if (transformErrorObject[error.name]) {
        transformedErrors.push({ ...error, message: transformErrorObject[error.name] });
      } else if (error.name !== 'type') {
        transformedErrors.push(error);
      }
    });
    return transformedErrors;
  }
  return errors;
};

/**
 * Handle form data validation
 * @param {Object} formData
 * @param {Object} errors
 * @param {Function} validate
 * @param {Object} validations
 * @return {Object} errors
 */
export const verifyFormDataValidations = ({ formData, errors, validate }) => {
  const validation = validate;
  if (!isEmpty(validation) && formData) {
    validation.forEach((valid) => {
      const {
        validator,
        field,
      } = valid;
      const error = validationTypes[validator](formData[field]);

      if (!isEmpty(error)) {
        errors[field].addError(error);
      }
    });
  }
  return errors;
};
