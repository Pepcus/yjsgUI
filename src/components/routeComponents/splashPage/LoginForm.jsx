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
  appConstants,
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
  const {
    NEW_REGISTRATION,
    ADMIN_LOGIN,
  } = appConstants;
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
  appConstants: {},
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

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
});

export default connect(mapStateToProps, null)(LoginForm);
