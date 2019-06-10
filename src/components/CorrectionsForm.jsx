import React from 'react';
import Form from 'react-jsonschema-form';
import PropTypes from 'prop-types';

import {
  formSubmitBtnText,
  TENANT,
  USER_TYPES,
} from '../constants/yjsg';
import {
  defaultAdmin,
  defaultStudent,
  indoreAdmin,
  indoreStudent,
  onlyOptin2019,
} from '../config/memberRegisrationCurrectionFormShema.json';
import Button from './common/Button';
import {
  CLICK_HERE_TEXT,
  UPDATE_FURTHER_INFORMATION_TEXT,
} from '../constants/text';

const JSONSchemaForm = Form;

/**
 * CorrectionsForm is functional component which render the correction form according to user type
 * @return {ReactComponent}
 */
const CorrectionsForm = ({ pageUser,
  tenant,
  onlyOptIn2019,
  renderSuccessMessage,
  validate,
  student,
  onChange,
  transformErrors,
  submitStudentDataForOnlyOptInCase,
  changeIsOnlyOptIn2019,
  renderBackButton,
  renderSubmitButtons,
  formRef }) => {

  if ((pageUser === USER_TYPES.STUDENT_WITH_URL || pageUser === USER_TYPES.STUDENT)
            && onlyOptIn2019) {
    return (
      <div className="form-container">
        <div className="form-wrapper" ref={formRef}>
          {renderSuccessMessage()}
          <JSONSchemaForm
            showErrorList={false}
            noHtml5Validate
            validate={validate}
            liveValidate
            schema={onlyOptin2019.Schema}
            uiSchema={onlyOptin2019.UISchema}
            formData={{
                ...onlyOptin2019.Data,
                ...student,
              }}
            onChange={onChange}
            transformErrors={transformErrors}
          >
            <div>
              <Button
                buttonText={formSubmitBtnText}
                type="submit"
                formName=""
                value="Submit"
                onClick={submitStudentDataForOnlyOptInCase}
              />
            </div>
            <span className="student-portal-link-heading">{UPDATE_FURTHER_INFORMATION_TEXT}
              <a className="student-portal-link" onClick={() => { changeIsOnlyOptIn2019(false); }}>{CLICK_HERE_TEXT}
              </a>
            </span>
          </JSONSchemaForm>
        </div>
      </div>
    );
  } else if (pageUser === USER_TYPES.ADMIN && tenant === TENANT.INDORE) {
    const newUISchema = {
      ...indoreAdmin.UISchema,
      backButton: {
        ...indoreAdmin.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...indoreAdmin.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    return (
      <div ref={formRef}>
        {renderSuccessMessage()}
        <JSONSchemaForm
          showErrorList={false}
          noHtml5Validate
          validate={validate}
          liveValidate
          schema={indoreAdmin.Schema}
          uiSchema={newUISchema}
          formData={{
              ...indoreAdmin.Data,
              ...student,
            }}
          onChange={onChange}
          transformErrors={transformErrors}
        />
      </div>
    );
  } else if ((pageUser === USER_TYPES.STUDENT || pageUser === USER_TYPES.STUDENT_WITH_URL)
            && tenant === TENANT.INDORE) {
    const newUISchema = {
      ...indoreStudent.UISchema,
      backButton: {
        ...indoreStudent.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...indoreStudent.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    return (
      <div ref={formRef}>
        {renderSuccessMessage()}
        <JSONSchemaForm
          showErrorList={false}
          noHtml5Validate
          validate={validate}
          liveValidate
          schema={indoreStudent.Schema}
          uiSchema={newUISchema}
          formData={{
              ...indoreStudent.Data,
              ...student,
            }}
          onChange={onChange}
          transformErrors={transformErrors}
        />
      </div>
    );
  } else if (pageUser === USER_TYPES.ADMIN && tenant !== TENANT.INDORE) {
    const newUISchema = {
      ...defaultAdmin.UISchema,
      backButton: {
        ...defaultAdmin.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...defaultAdmin.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    return (
      <div ref={formRef}>
        {renderSuccessMessage()}
        <JSONSchemaForm
          showErrorList={false}
          noHtml5Validate
          validate={validate}
          liveValidate
          schema={defaultAdmin.Schema}
          uiSchema={newUISchema}
          formData={{
              ...defaultAdmin.Data,
              ...student,
            }}
          onChange={onChange}
          transformErrors={transformErrors}
        />
      </div>
    );
  } else if ((pageUser === USER_TYPES.STUDENT || pageUser === USER_TYPES.STUDENT_WITH_URL)
            && tenant !== TENANT.INDORE) {
    const newUISchema = {
      ...defaultStudent.UISchema,
      backButton: {
        ...defaultStudent.UISchema.backButton,
        'ui:widget': () => (
          renderBackButton()
        ),
      },
      submitButton: {
        ...defaultAdmin.UISchema.submitButton,
        'ui:widget': () => (
          renderSubmitButtons()
        ),
      },
    };
    return (
      <div ref={formRef}>
        {renderSuccessMessage()}
        <JSONSchemaForm
          showErrorList={false}
          noHtml5Validate
          validate={validate}
          liveValidate
          schema={defaultStudent.Schema}
          uiSchema={newUISchema}
          formData={{
              ...defaultStudent.Data,
              ...student,
            }}
          onChange={onChange}
          transformErrors={transformErrors}
        />
      </div>
    );
  }
  return null;

};

CorrectionsForm.propTypes = {
  pageUser: PropTypes.string,
  tenant: PropTypes.string,
  onlyOptIn2019: PropTypes.bool,
  renderSuccessMessage: PropTypes.func,
  validate: PropTypes.func,
  student: PropTypes.object,
  onChange: PropTypes.func,
  transformErrors: PropTypes.func,
  submitStudentDataForOnlyOptInCase: PropTypes.func,
  changeIsOnlyOptIn2019: PropTypes.func,
  renderBackButton: PropTypes.func,
  renderSubmitButtons: PropTypes.func,
  formRef: PropTypes.object,
};

CorrectionsForm.defaultProps = {
  pageUser: PropTypes.string,
  tenant: PropTypes.string,
  onlyOptIn2019: false,
  renderSuccessMessage: () => {},
  validate: () => {},
  student: {},
  onChange: () => {},
  transformErrors: () => {},
  submitStudentDataForOnlyOptInCase: () => {},
  changeIsOnlyOptIn2019: () => {},
  renderBackButton: () => {},
  renderSubmitButtons: () => {},
  formRef: {},
};
export default CorrectionsForm;
