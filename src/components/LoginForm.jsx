import {
  Redirect,
  Switch,
} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import AdminLoginForm from './AdminLoginForm';
import {
  adminLoginBtnText,
  newRegistrationBtnText,
} from '../constants/yjsg';
import Button from './common/Button';

/**
 * LoginForm render login form
 * @param {Boolean} isAdmin
 * @param {Object} admin
 * @param {Function} adminScreenRedirection
 * @param {Function} disableAdminLoginButtons
 * @param {Function} setAdminLogin
 * @param {Boolean} isNewRegistration
 * @param {Function} redirectToNewRegistrationPage
 * @param {Function} enableAdminLoginButtons
 * @param {Function} onChange
 * @param {Function} transformErrors
 * @type {Function}
 * @return {*} admin login form
 * @constructor
 */
const LoginForm = ({
  onChange,
  transformErrors,
  isAdmin,
  admin,
  adminScreenRedirection,
  disableAdminLoginButtons,
  setAdminLogin,
  isNewRegistration,
  redirectToNewRegistrationPage,
  enableAdminLoginButtons,
}) => {

  if (isAdmin) {
    return (
      <AdminLoginForm
        onChange={onChange}
        transformErrors={transformErrors}
        isAdmin={isAdmin}
        admin={admin}
        adminScreenRedirection={adminScreenRedirection}
        disableAdminLoginButtons={disableAdminLoginButtons}
        setAdminLogin={setAdminLogin}
      />
    );

  } else if (isNewRegistration) {
    return <Switch><Redirect to="/studentRegister" /></Switch>;

  } else if (!isAdmin) {
    return (
      <div>
        <Button
          type="button"
          buttonText={newRegistrationBtnText}
          onClick={redirectToNewRegistrationPage}
        />
        <Button
          type="button"
          buttonText={adminLoginBtnText}
          onClick={enableAdminLoginButtons}
        />
      </div>
    );
  } return null;
};

LoginForm.propTypes = {
  onChange: PropTypes.func,
  transformErrors: PropTypes.func,
  admin: PropTypes.object,
  adminScreenRedirection: PropTypes.func,
  disableAdminLoginButtons: PropTypes.func,
  enableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  isNewRegistration: PropTypes.bool,
  redirectToNewRegistrationPage: PropTypes.func,
  setAdminLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  onChange: () => {},
  transformErrors: () => {},
  admin: {},
  adminScreenRedirection: () => {},
  disableAdminLoginButtons: () => {},
  enableAdminLoginButtons: () => {},
  isAdmin: false,
  isNewRegistration: false,
  redirectToNewRegistrationPage: () => {},
  setAdminLogin: () => {},
};

export default LoginForm;
