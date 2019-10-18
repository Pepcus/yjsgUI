import {
  Redirect,
  Switch,
} from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';
import Row from 'pepcus-core/lib/Row';

import { getAppConstantsConfig } from 'reducers/constants';

import AdminLoginForm from './AdminLoginForm';

const ButtonStyled = styled(Button)`
 width: 180px;
 ${({ theme }) => theme.media.down('sm')`
     width: 100%
     margin: 10px 10px; 
 `};
 @media (max-width: 992px) and (orientation: landscape) {
     width: 100%;
 }
`;

/**
 * @param {Object} appConstants
 * @param {Object} admin
 * @param {Function} enableAdminLoginButtons
 * @param {Function} handleDisableAdminLoginButtons
 * @param {Boolean} isAdmin
 * @param {Boolean} isNewRegistration
 * @param {Function} onChange
 * @param {Function} redirectToNewRegistrationPage
 * @param {Function} setAdminLogin
 * @param {Function} transformErrors
 * @param {Boolean} adminCredentialErrorMessage
 * @param {String} redirectToRoute
 * @param {String} id
 * @param {String} password
 * @param {Boolean} isAdminLogin
 * @param {Function} setRedirectToRoute
 * @return {HTML}
 */
const LoginForm = ({
  appConstants,
  admin,
  enableAdminLoginButtons,
  handleDisableAdminLoginButtons,
  isAdmin,
  isNewRegistration,
  onChange,
  redirectToNewRegistrationPage,
  setAdminLogin,
  transformErrors,
  adminCredentialErrorMessage,
  redirectToRoute,
  id,
  password,
  isAdminLogin,
  setRedirectToRoute,
}) => {
  const {
    NEW_REGISTRATION,
    ADMIN_LOGIN,
  } = appConstants;
  if (isAdmin) {
    return (
      <AdminLoginForm
        adminCredentialErrorMessage={adminCredentialErrorMessage}
        redirectToRoute={redirectToRoute}
        id={id}
        password={password}
        isAdminLogin={isAdminLogin}
        setRedirectToRoute={setRedirectToRoute}
        admin={admin}
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
          {NEW_REGISTRATION}
        </ButtonStyled>
        <ButtonStyled
          margin="10px 15px"
          onClick={enableAdminLoginButtons}
        >
          {ADMIN_LOGIN}
        </ButtonStyled>
      </Row>
    );
  } return null;
};

LoginForm.propTypes = {
  appConstants: PropTypes.object,
  admin: PropTypes.object,
  enableAdminLoginButtons: PropTypes.func,
  handleDisableAdminLoginButtons: PropTypes.func,
  isAdmin: PropTypes.bool,
  isNewRegistration: PropTypes.bool,
  onChange: PropTypes.func,
  redirectToNewRegistrationPage: PropTypes.func,
  setAdminLogin: PropTypes.func,
  transformErrors: PropTypes.func,
  adminCredentialErrorMessage: PropTypes.bool,
  redirectToRoute: PropTypes.string,
  id: PropTypes.string,
  password: PropTypes.string,
  isAdminLogin: PropTypes.bool,
  setRedirectToRoute: PropTypes.func,
};

LoginForm.defaultProps = {
  appConstants: {},
  admin: {},
  enableAdminLoginButtons: () => {},
  handleDisableAdminLoginButtons: () => {},
  isAdmin: false,
  isNewRegistration: false,
  onChange: () => {},
  redirectToNewRegistrationPage: () => {},
  setAdminLogin: () => {},
  transformErrors: () => {},
  adminCredentialErrorMessage: false,
  redirectToRoute: '',
  id: '',
  password: '',
  isAdminLogin: false,
  setRedirectToRoute: () => {},
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(LoginForm);
