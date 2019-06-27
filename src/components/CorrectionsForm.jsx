import React from 'react';
import PropTypes from 'prop-types';

import { getFormData } from '../utils/formDataUtils';
import {
  formSubmitBtnText,
} from '../constants/yjsg';
import Button from './common/Button';
import {
  CLICK_HERE_TEXT,
  UPDATE_FURTHER_INFORMATION_TEXT,
} from '../constants/text';
import { isPageUserStudent } from '../utils/registrationFormUtils';
import Form from './Form';

/**
 * CorrectionsForm is functional component which render the correction form according to user type
 * @return {HTML} correction form
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

  /**
   * getBackButton render back button conditionally
   * @return {HTML} back button
   */
  const getBackButton = () => {
    if (isPageUserStudent({ pageUser }) && onlyOptInForm) {
      return (
        <div>
          <Button
            buttonText={formSubmitBtnText}
            type="submit"
            value="Submit"
            onClick={submitStudentDataForOnlyOptInCase}
          />
        </div>
      );
    } return null;
  };

  /**
   * callBack for changeIsOnlyOptIn
   */
  const onlyOptInChanged = () => {
    changeIsOnlyOptIn(false);
  };

  /**
   * getLink method render link of update other information conditionally
   * @return {HTML} update other information link
   */
  const getLink = () => {
    if (isPageUserStudent({ pageUser }) && onlyOptInForm) {
      return (
        <span className="student-portal-link-heading">{UPDATE_FURTHER_INFORMATION_TEXT}
          <a className="student-portal-link" onClick={onlyOptInChanged}>{CLICK_HERE_TEXT}
          </a>
        </span>
      );
    }
    return null;
  };

  if (formDetails) {
    return (
      <div
        className={isPageUserStudent({ pageUser })
      && onlyOptInForm ? 'form-container member-registration-correction-form' : 'default-form-container member-registration-correction-form'}
      >
        <div
          className={isPageUserStudent({ pageUser }) && onlyOptInForm ? 'form-wrapper' : ''}
          ref={formRef}
        >
          { children }
          <Form
            showErrorList={false}
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
  children: PropTypes.node,
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
};

CorrectionsForm.defaultProps = {
  changeIsOnlyOptIn: () => {},
  children: null,
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
};

export default CorrectionsForm;
