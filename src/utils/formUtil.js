import isEmpty from 'lodash/isEmpty';

/**
 * transform the error form errors array
 * @param {Array} errors
 * @param {Function} transformErrors
 * @return {Array}
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
