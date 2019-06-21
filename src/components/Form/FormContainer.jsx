import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import isEmpty from 'lodash/isEmpty';

import validations from '../../utils/validation';

const JSONSchemaForm = Form;

/**
 * FormContainer render JSON form schema
 * @return {*} Form
 */
class FormContainer extends Component {

  /**
   * getFormSchema return form schema
   * @param {Object} schema
   * @return {Object} schema
   */
  getFormSchema = () => {
    const { schema } = this.props;
    return schema;
  };

  /**
   * getFormUISchema return uiSchema
   * @param {Object} uiSchema
   * @return {Object} uiSchema
   */
  getFormUISchema = () => {
    const { uiSchema } = this.props;
    return uiSchema;
  };

  /**
   * getFormData return formData
   * @param {Object} formData
   * @return {Object} formData
   */
  getFormData = () => {
    const { formData } = this.props;
    return formData;
  };

  /**
   * getOnChange return onChange function
   * @param {Function} onChange
   * @return {Function} onChange
   */
  getOnChange = () => {
    const { onChange } = this.props;
    return onChange;
  };

  /**
   * transformErrors return transformErrors function
   * @param {Object} errors
   * @return {Function} transformErrors
   */
  getTransformErrors = (errors) => {
    const { transformErrors } = this.props;
    const transformErrorObject = transformErrors();
    const temError = [];

    if (!isEmpty(transformErrorObject)) {
      errors.forEach((error) => {
        if (transformErrorObject[error.name]) {
          temError.push({ ...error, message: transformErrorObject[error.name] });
        } else if (error.name !== 'type') {
          temError.push(error);
        }
      });
      return temError;
    }
    return errors;
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      return onSubmit;
    } return null;
  };
  getValidate = (formData, errors) => {
    const validation = this.props.validate();
    if (!isEmpty(validation) && formData) {
      validation.forEach((valid) => {

        const error = validations[valid.validates](formData[valid.field]);

        if (!isEmpty(error)) {
          errors[valid.field].addError(error);
        }
      });
    }
    return errors;
  };

  render() {

    const {
      children,
    } = this.props;

    return (
      <JSONSchemaForm
        showErrorList={false}
        noHtml5Validate
        validate={this.getValidate}
        liveValidate
        schema={this.getFormSchema()}
        uiSchema={this.getFormUISchema()}
        formData={this.getFormData()}
        onChange={this.getOnChange()}
        transformErrors={this.getTransformErrors}
        onSubmit={this.onSubmit()}
      >
        {children}
      </JSONSchemaForm>
    );
  }
}

FormContainer.propTypes = {
  children: PropTypes.node,
  formData: PropTypes.object,
  onChange: PropTypes.func,
  schema: PropTypes.object,
  transformErrors: PropTypes.func,
  uiSchema: PropTypes.object,
  validate: PropTypes.func,
  onSubmit: PropTypes.func,
};

FormContainer.defaultProps = {
  children: null,
  formData: {},
  onChange: () => {},
  schema: {},
  transformErrors: () => {},
  uiSchema: {},
  validate: () => {},
  onSubmit: () => {},
};

export default FormContainer;
