/* eslint-disable import/no-extraneous-dependencies */
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';

import {
  adminLoginBtnText,
  newRegistrationBtnText,
} from 'constants/yjsg';
import AdminLoginForm from './AdminLoginForm';

const ButtonStyled = styled(Button)`
 width: 180px;
 ${({ theme }) => theme.media.down('sm')`
     width: 100%
     margin: 10px 10px; 
 `}
 @media (max-width: 992px) and (orientation: landscape) {
     width: 100%;
 }
`;

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
    return <Switch><Redirect to="/member-register" /></Switch>;

  } else if (!isAdmin) {
    return (
      <Row justify="center" margin="0 0 25px 0">
        <ButtonStyled
          margin="10px 15px"
          onClick={redirectToNewRegistrationPage}
        >
          {newRegistrationBtnText}
        </ButtonStyled>
        <ButtonStyled
          margin="10px 15px"
          onClick={enableAdminLoginButtons}
        >
          {adminLoginBtnText}
        </ButtonStyled>
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
