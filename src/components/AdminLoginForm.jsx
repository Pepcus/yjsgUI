import React from 'react';
import PropTypes from 'prop-types';

import {
  formSubmitBtnText,
  goBackBtnText,
} from '../constants/yjsg';
import Button from './common/Button';
import Form from './Form';

/**
 * AdminLoginForm method render admin login form
 * @param {Boolean} isAdmin
 * @param {Object} admin
 * @param {Function} adminScreenRedirection
 * @param {Function} disableAdminLoginButtons
 * @param {Function} setAdminLogin
 * @param {Function} onChange
 * @param {Function} transformErrors
 * @return {*} admin login form
 * @constructor
 */
const AdminLoginForm = ({
  transformErrors,
  isAdmin,
  admin,
  adminScreenRedirection,
  disableAdminLoginButtons,
  setAdminLogin,
  onChange }) => {

  if (isAdmin) {

    const formDetail = {
      Schema: {
        'type': 'object',
        'properties': {
          'adminId': {
            'title': 'Admin ID',
            'type': 'string',
          },
          'adminPassword': {
            'title': 'Admin Password',
            'type': 'string',
          },
          'backButton': {
            'type': 'string',
          },
          'submitButton': {
            'type': 'string',
          },
        },
        'required': ['adminId', 'adminPassword'],
      },
      UISchema: {
        'adminId': {
          'ui:placeholder': 'Enter Admin ID',
          'ui:widget': 'textarea',
        },
        'adminPassword': {
          'ui:placeholder': 'Enter Admin Password',
          'ui:widget': 'password',
        },
        'backButton': {
          'classNames': 'button-style',
          'ui:options': {
            'label': false,
          },
          'ui:widget': () => (
            <Button
              type="button"
              buttonText={goBackBtnText}
              onClick={disableAdminLoginButtons}
            />
          ),
        },
        'submitButton': {
          'classNames': 'button-style',
          'ui:options': {
            'label': false,
          },
          'ui:widget': () => (
            <Button
              type="submit"
              formName="adminCredential"
              buttonText={formSubmitBtnText}
              onClick={setAdminLogin}
            />
          ),
        },
      },
      data: {},
    };

    return (
      <div className="student-already-register-form">
        {adminScreenRedirection()}
        <Form
          showErrorList={false}
          noHtml5Validate
          liveValidate
          schema={formDetail.Schema}
          uiSchema={formDetail.UISchema}
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
  adminScreenRedirection: PropTypes.func,
  disableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  setAdminLogin: PropTypes.func,
};

AdminLoginForm.defaultProps = {
  onChange: () => {},
  transformErrors: () => {},
  admin: {},
  adminScreenRedirection: () => {},
  disableAdminLoginButtons: () => {},
  isAdmin: false,
  setAdminLogin: () => {},
};

export default AdminLoginForm;
