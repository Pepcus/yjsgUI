import React from 'react';
import PropTypes from 'prop-types';

import InputField from './form/InputField';
import { formSubmitBtnText, goBackBtnText } from '../constants/yjsg';
import Button from './common/Button';


const AdminLoginForm = ({ isAdmin, admin, handleInputChange, adminScreenRedirection, disableAdminLoginButtons, setAdminLogin }) => {
  if (isAdmin) {
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
              value={admin.adminId}
            />
            <InputField
              type="password"
              name="adminPassword"
              label="Admin Password"
              placeholder="Enter Admin Password"
              onInputChange={handleInputChange}
              value={admin.adminPassword}
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

AdminLoginForm.propsType = {
  isAdmin: PropTypes.bool,
  admin: PropTypes.object,
  handleInputChange: PropTypes.func,
  adminScreenRedirection: PropTypes.func,
  disableAdminLoginButtons: PropTypes.func,
  setAdminLogin: PropTypes.func,
};
AdminLoginForm.defaultProps = {
  isAdmin: false,
  admin: {},
  handleInputChange: () => {},
  adminScreenRedirection: () => {},
  disableAdminLoginButtons: () => {},
  setAdminLogin: () => {},
};
export default AdminLoginForm;
