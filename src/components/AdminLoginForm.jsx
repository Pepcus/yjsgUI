import React from 'react';
import PropTypes from 'prop-types';

import InputField from './form/InputField';
import {
  formSubmitBtnText,
  goBackBtnText,
} from '../constants/yjsg';
import Button from './common/Button';

/**
 * AdminLoginForm method render admin login form
 * @param {Boolean} isAdmin
 * @param {Object} admin
 * @param {Function} handleInputChange
 * @param {Function} adminScreenRedirection
 * @param {Function} disableAdminLoginButtons
 * @param {Function} setAdminLogin
 * @return {*} admin login form
 * @constructor
 */
const AdminLoginForm = ({ isAdmin,
  admin,
  handleInputChange,
  adminScreenRedirection,
  disableAdminLoginButtons,
  setAdminLogin }) => {

  if (isAdmin) {

    const { adminId, adminPassword } = admin;

    return (
      <div>
        <form id="adminCredential">
          <div className="form-input-wrapper">
            <InputField
              type="text"
              name="adminId"
              label="Admin ID"
              placeholder="Enter Admin ID"
              onInputChange={handleInputChange}
              value={adminId}
            />
            <InputField
              type="password"
              name="adminPassword"
              label="Admin Password"
              placeholder="Enter Admin Password"
              onInputChange={handleInputChange}
              value={adminPassword}
            />
            {adminScreenRedirection()}
          </div>
          <div className="button-wrapper">
            <Button
              type="button"
              buttonText={goBackBtnText}
              onClick={disableAdminLoginButtons}
            />
            <Button
              type="submit"
              formName="adminCredential"
              buttonText={formSubmitBtnText}
              onClick={setAdminLogin}
            />
          </div>
        </form>
      </div>
    );
  }
  return null;
};

AdminLoginForm.propTypes = {
  admin: PropTypes.object,
  adminScreenRedirection: PropTypes.func,
  disableAdminLoginButtons: PropTypes.func,
  handleInputChange: PropTypes.func,
  isAdmin: PropTypes.bool,
  setAdminLogin: PropTypes.func,
};

AdminLoginForm.defaultProps = {
  admin: {},
  adminScreenRedirection: () => {},
  disableAdminLoginButtons: () => {},
  handleInputChange: () => {},
  isAdmin: false,
  setAdminLogin: () => {},
};

export default AdminLoginForm;
