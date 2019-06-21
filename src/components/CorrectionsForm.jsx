import React from 'react';
// import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

import { getFormData } from '../utils/formDataUtils';
import {
  formSubmitBtnText,
  USER_TYPES,
} from '../constants/yjsg';
import Button from './common/Button';
import {
  CLICK_HERE_TEXT,
  UPDATE_FURTHER_INFORMATION_TEXT,
} from '../constants/text';
import Form from './Form';

// const JSONSchemaForm = Form;

/**
 * CorrectionsForm is functional component which render the correction form according to user type
 * @return {*} correction form
 */
const CorrectionsForm = ({ pageUser,
  tenant,
  onlyOptInForm,
  validate,
  student,
  onChange,
  transformErrors,
  submitStudentDataForOnlyOptInCase,
  changeIsOnlyOptIn,
  renderBackButton,
  renderSubmitButtons,
  formRef,
  children }) => {
  const formDetails = getFormData({
    pageUser,
    onlyOptInForm,
    tenant,
    student,
    renderBackButton,
    renderSubmitButtons,
  });

  const { STUDENT_WITH_URL, STUDENT } = USER_TYPES;

  /**
   * getBackButton render back button conditionally
   * @return {*} back button
   */
  const getBackButton = () => {
    if ((pageUser === STUDENT_WITH_URL || pageUser === STUDENT)
      && onlyOptInForm) {
      return (
        <div>
          <Button
            buttonText={formSubmitBtnText}
            type="submit"
            formName=""
            value="Submit"
            onClick={submitStudentDataForOnlyOptInCase}
          />
        </div>
      );
    } return null;
  };

  /**
   * getLink method render link of update other information conditionally
   * @return {*} update other information link
   */
  const getLink = () => {
    if ((pageUser === STUDENT_WITH_URL || pageUser === STUDENT)
      && onlyOptInForm) {
      return (
        <span className="student-portal-link-heading">{UPDATE_FURTHER_INFORMATION_TEXT}
          <a className="student-portal-link" onClick={() => { changeIsOnlyOptIn(false); }}>{CLICK_HERE_TEXT}
          </a>
        </span>
      );
    } return null;
  };

  if (formDetails) {
    return (
      <div
        className={(pageUser === STUDENT_WITH_URL || pageUser === STUDENT)
      && onlyOptInForm ? 'form-container member-registration-correction-form' : 'default-form-container member-registration-correction-form'}
      >
        <div
          className={(pageUser === STUDENT_WITH_URL || pageUser === STUDENT)
          && onlyOptInForm ? 'form-wrapper' : ''}
          ref={formRef}
        >
          { children }
          <Form
            showErrorList={false}
            noHtml5Validate
            validate={validate}
            liveValidate
            schema={formDetails.schema}
            uiSchema={formDetails.uiSchema}
            formData={formDetails.formData}
            onChange={onChange}
            transformErrors={transformErrors}
          >
            { getBackButton() }
            { getLink() }
          </Form>
        </div>
      </div>
    );
  }
  return null;

};

CorrectionsForm.propTypes = {
  changeIsOnlyOptIn: PropTypes.func,
  formRef: PropTypes.object,
  onChange: PropTypes.func,
  onlyOptInForm: PropTypes.bool,
  pageUser: PropTypes.string,
  renderBackButton: PropTypes.func,
  renderSubmitButtons: PropTypes.func,
  student: PropTypes.object,
  submitStudentDataForOnlyOptInCase: PropTypes.func,
  tenant: PropTypes.string,
  transformErrors: PropTypes.func,
  validate: PropTypes.func,
  children: PropTypes.node,
};

CorrectionsForm.defaultProps = {
  changeIsOnlyOptIn: () => {},
  formRef: {},
  onChange: () => {},
  onlyOptInForm: false,
  pageUser: PropTypes.string,
  renderBackButton: () => {},
  renderSubmitButtons: () => {},
  student: {},
  submitStudentDataForOnlyOptInCase: () => {},
  tenant: PropTypes.string,
  transformErrors: () => {},
  validate: () => {},
  children: null,
};

export default CorrectionsForm;
