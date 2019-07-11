import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';

import {
  getTransformedErrors,
  verifyFormDataValidations,
} from '../../utils/formUtils';

const JSONSchemaForm = Form;

/**
 * FormContainer render JSON form schema
 * @return {HTML} Form
 */
class FormContainer extends Component {

  /**
   * getFormSchema return form schema
   * @return {Object} schema
   */
  getFormSchema = () => {
    const { schema } = this.props;
    return schema;
  };

  /**
   * getFormUiSchema return uiSchema
   * @return {Object} uiSchema
   */
  getFormUiSchema = () => {
    const { uiSchema } = this.props;
    return uiSchema;
  };

  /**
   * getFormData return formData
   * @return {Object} formData
   */
  getFormData = () => {
    const { formData } = this.props;
    return formData;
  };

  /**
   * getOnChange return onChange function
   * @return {Function} onChange
   */
  getOnChange = () => {
    const { onChange } = this.props;
    return onChange;
  };

  /**
   * getTransformErrors return transformErrors function
   * @param {Array} errors
   * @return {Array} errors
   */
  getTransformErrors = (errors) => {
    const { transformErrors } = this.props;
    return getTransformedErrors({ errors, transformErrors });
  };

  /**
   * handle the form submission
   * @return {Function} onSubmit
   */
  onSubmit = () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      return onSubmit;
    }
    return null;
  };

  /**
   * handle form data validation
   * @param {Object} formData
   * @param {Object} errors
   * @return {Object} errors
   */
  handleFormDataValidations = (formData, errors) => {
    const validation = this.props.validate();
    return verifyFormDataValidations({ formData, errors, validate: validation });
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <JSONSchemaForm
        showErrorList={this.props.showErrorList}
        validate={this.handleFormDataValidations}
        noHtml5Validate={this.props.noHtml5Validate}
        liveValidate
        schema={this.getFormSchema()}
        uiSchema={this.getFormUiSchema()}
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
  noHtml5Validate: PropTypes.bool,
  onChange: PropTypes.func,
  schema: PropTypes.object,
  showErrorList: PropTypes.bool,
  transformErrors: PropTypes.func,
  uiSchema: PropTypes.object,
  validate: PropTypes.func,
  onSubmit: PropTypes.func,
};

FormContainer.defaultProps = {
  children: null,
  formData: {},
  noHtml5Validate: true,
  onChange: () => {},
  schema: {},
  showErrorList: true,
  transformErrors: () => {},
  uiSchema: {},
  validate: () => {},
  onSubmit: () => {},
};

export default FormContainer;
