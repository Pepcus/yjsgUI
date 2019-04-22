import { Redirect, Switch } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import AdminLoginForm from './AdminLoginForm';
import { adminLoginBtnText, newRegistrationBtnText } from '../utils/yjsgConstants';
import Button from './commonComponents/Button';

const LoginForm = ({ isAdmin,
  admin,
  handleInputChange,
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
        isAdmin={isAdmin}
        admin={admin}
        handleInputChange={handleInputChange}
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

LoginForm.propsType = {
  isAdmin: PropTypes.bool,
  admin: PropTypes.object,
  handleInputChange: PropTypes.func,
  adminScreenRedirection: PropTypes.func,
  disableAdminLoginButtons: PropTypes.func,
  setAdminLogin: PropTypes.func,
  isNewRegistration: PropTypes.bool,
  redirectToNewRegistrationPage: PropTypes.func,
  enableAdminLoginButtons: PropTypes.func,
};
LoginForm.defaultProps = {
  isAdmin: false,
  admin: {},
  handleInputChange: () => {},
  adminScreenRedirection: () => {},
  disableAdminLoginButtons: () => {},
  setAdminLogin: () => {},
  isNewRegistration: false,
  redirectToNewRegistrationPage: () => {},
  enableAdminLoginButtons: () => {},
};
export default LoginForm;