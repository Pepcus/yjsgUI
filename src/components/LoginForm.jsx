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
 * @param {Function} handleAdminScreenRedirection
 * @param {Function} handleDisableAdminLoginButtons
 * @param {Function} setAdminLogin
 * @param {Boolean} isNewRegistration
 * @param {Function} redirectToNewRegistrationPage
 * @param {Function} enableAdminLoginButtons
 * @param {Function} onChange
 * @param {Function} transformErrors
 * @type {Function}
 * @return {HTML} admin login form
 * @constructor
 */
const LoginForm = ({
  onChange,
  transformErrors,
  isAdmin,
  admin,
  handleAdminScreenRedirection,
  handleDisableAdminLoginButtons,
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
        handleAdminScreenRedirection={handleAdminScreenRedirection}
        handleDisableAdminLoginButtons={handleDisableAdminLoginButtons}
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
  handleAdminScreenRedirection: PropTypes.func,
  handleDisableAdminLoginButtons: PropTypes.func,
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
  handleAdminScreenRedirection: () => {},
  handleDisableAdminLoginButtons: () => {},
  enableAdminLoginButtons: () => {},
  isAdmin: false,
  isNewRegistration: false,
  redirectToNewRegistrationPage: () => {},
  setAdminLogin: () => {},
};

export default LoginForm;
