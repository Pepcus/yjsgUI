/* eslint-disable import/no-extraneous-dependencies */
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'ravenjs/lib/Button';
import Row from 'ravenjs/lib/Row';

import {
  adminLoginBtnText,
  newRegistrationBtnText,
} from 'constants/yjsg';
import AdminLoginForm from './AdminLoginForm';

/**
 * @param {Object} admin
 * @param {Function} enableAdminLoginButtons
 * @param {Function} handleAdminScreenRedirection
 * @param {Function} handleDisableAdminLoginButtons
 * @param {Boolean} isAdmin
 * @param {Boolean} isNewRegistration
 * @param {Function} onChange
 * @param {Function} redirectToNewRegistrationPage
 * @param {Function} setAdminLogin
 * @param {Function} transformErrors
 * @return {HTML}
 * @constructor
 */

const LoginForm = ({
  admin,
  enableAdminLoginButtons,
  handleAdminScreenRedirection,
  handleDisableAdminLoginButtons,
  isAdmin,
  isNewRegistration,
  onChange,
  redirectToNewRegistrationPage,
  setAdminLogin,
  transformErrors,
}) => {

  if (isAdmin) {
    return (
      <AdminLoginForm
        admin={admin}
        handleAdminScreenRedirection={handleAdminScreenRedirection}
        handleDisableAdminLoginButtons={handleDisableAdminLoginButtons}
        isAdmin={isAdmin}
        onChange={onChange}
        setAdminLogin={setAdminLogin}
        transformErrors={transformErrors}
      />
    );

  } else if (isNewRegistration) {
    return <Switch><Redirect to="/studentRegister" /></Switch>;

  } else if (!isAdmin) {
    return (
      <Row justify="center">
        <Button
          margin="10px"
          onClick={redirectToNewRegistrationPage}
        >
          {newRegistrationBtnText}
        </Button>
        <Button
          margin="10px"
          onClick={enableAdminLoginButtons}
        >
          {adminLoginBtnText}
        </Button>
      </Row>
    );
  } return null;
};

LoginForm.propTypes = {
  admin: PropTypes.object,
  enableAdminLoginButtons: PropTypes.func,
  handleAdminScreenRedirection: PropTypes.func,
  handleDisableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  isNewRegistration: PropTypes.bool,
  onChange: PropTypes.func,
  redirectToNewRegistrationPage: PropTypes.func,
  setAdminLogin: PropTypes.func,
  transformErrors: PropTypes.func,
};

LoginForm.defaultProps = {
  admin: {},
  enableAdminLoginButtons: () => {},
  handleAdminScreenRedirection: () => {},
  handleDisableAdminLoginButtons: () => {},
  isAdmin: false,
  isNewRegistration: false,
  onChange: () => {},
  redirectToNewRegistrationPage: () => {},
  setAdminLogin: () => {},
  transformErrors: () => {},
};

export default LoginForm;
