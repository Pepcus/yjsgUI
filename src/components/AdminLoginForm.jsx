import React from 'react';
import PropTypes from 'prop-types';

import {
  formSubmitBtnText,
  goBackBtnText,
} from '../constants/yjsg';
import Button from './common/Button';
import Form from './Form';
import { AdminLoginFormJsonSchema } from '../config/fromJsonSchema.json';

/**
 * AdminLoginForm method render admin login form
 * @param {Boolean} isAdmin
 * @param {Object} admin
 * @param {Function} handleAdminScreenRedirection
 * @param {Function} handleDisableAdminLoginButtons
 * @param {Function} setAdminLogin
 * @param {Function} onChange
 * @param {Function} transformErrors
 * @return {HTML} admin login form
 */
const AdminLoginForm = ({
  transformErrors,
  isAdmin,
  admin,
  handleAdminScreenRedirection,
  handleDisableAdminLoginButtons,
  setAdminLogin,
  onChange }) => {

  if (isAdmin) {
    const uiSchema = {
      ...AdminLoginFormJsonSchema.UISchema,
      backButton: {
        ...AdminLoginFormJsonSchema.UISchema.backButton,
        'ui:widget': () => (
          <Button
            type="button"
            buttonText={goBackBtnText}
            onClick={handleDisableAdminLoginButtons}
          />
        ),
      },
      submitButton: {
        ...AdminLoginFormJsonSchema.UISchema.submitButton,
        'ui:widget': () => (
          <Button
            type="submit"
            formName="adminCredential"
            buttonText={formSubmitBtnText}
            onClick={setAdminLogin}
          />
        ),
      },
    };

    return (
      <div className="student-already-register-form">
        {handleAdminScreenRedirection()}
        <Form
          showErrorList={false}
          liveValidate
          schema={AdminLoginFormJsonSchema.Schema}
          uiSchema={uiSchema}
          formData={admin}
          onChange={onChange}
          transformErrors={transformErrors}
        />
      </div>
    );
  }
  return null;
};

AdminLoginForm.propTypes = {
  onChange: PropTypes.func,
  transformErrors: PropTypes.func,
  admin: PropTypes.object,
  handleAdminScreenRedirection: PropTypes.func,
  handleDisableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  setAdminLogin: PropTypes.func,
};

AdminLoginForm.defaultProps = {
  onChange: () => {},
  transformErrors: () => {},
  admin: {},
  handleAdminScreenRedirection: () => {},
  handleDisableAdminLoginButtons: () => {},
  isAdmin: false,
  setAdminLogin: () => {},
};

export default AdminLoginForm;
