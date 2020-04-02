import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

import * as customValidators from 'utils/validations';
import deepmerge from 'deepmerge';

/**
 * Method return transformErrors function
 * @param {Array} errors
 * @param {Function} transformErrors
 * @return {Array} errors
 */

export const getTransformedErrors = ({ errors = [], transformErrors }) => {
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
    return suppressEnumErrors(transformedErrors);
  }
  return suppressEnumErrors(errors);
};

export const suppressEnumErrors = (errors) => {
  return errors.filter(error => error.name !== 'enum' && error.name !== 'oneOf');
};

const applyValidators = (schemaItem, formData, errors, constants) => {
  if (schemaItem.dependencies) {
    Object.keys(schemaItem.dependencies).forEach((key) => {
      if (schemaItem.dependencies[key].oneOf) {
        schemaItem.dependencies[key].oneOf.forEach((oneOfKey) => {
          applyValidators(oneOfKey.properties, formData, errors, constants);
        })
      } else {
        applyValidators(schemaItem.dependencies[key].properties, formData, errors, constants);
      }
    });
  }
  Object.keys(schemaItem).forEach((key) => {
    // The top level form objects will have a properties key
    if (key === 'properties') {
      applyValidators(schemaItem.properties, formData, errors, constants);
      // If it has properties, it means the schemaItem contains nested fields
      // (because it is a nested form)
    } else if (typeof schemaItem[key] === 'object' && 'properties' in schemaItem[key]) {
      applyValidators(schemaItem[key].properties, formData[key], errors[key], constants);
      // It is a fieldObject, which would contain the customValidation rules.
    } else if (typeof schemaItem[key] === 'object' && 'customValidation' in schemaItem[key]) {
      const validationFunction = schemaItem[key].customValidation;
      const test = customValidators[validationFunction](formData[key], constants);
      // If a test object is returned and valid, then
      // add an error message to the requested form field.
      if (test) {
        errors[key].addError(test);
      }
    }
  });
};
export const formValidators = (formSchema, constants) => {
  // The custom validate function must always return the errors
  // object received as second argument.
  return (formData, errors) => {
    // Make a copy of the 'errors' Object since we are going to mutate it in
    // applyValidators()
    const customErrors = cloneDeep(errors);
    // This recurses through the schema object, looking for custom validation
    // rules and running them and updating the errors object if any are
    // found invalid.
    applyValidators(formSchema, formData, customErrors, constants);
    // TODO: cloneDeep + deepMerge is probably more inefficient than it
    // needs to be. Consider refactoring if there are performance issues.
    return deepmerge(errors, customErrors);
  };
};
