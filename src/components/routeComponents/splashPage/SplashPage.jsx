import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Col from 'pepcus-core/lib/Col';
import Container from 'pepcus-core/lib/Container';
import { getThemeProps } from 'pepcus-core/utils/theme';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  fetchMemberDataAction,
  setMemberCredentialsAction,
} from 'actions/memberRegistrationActions';
import {
  setHashLinkForNewRegistrationAction,
} from 'actions/appActions';
import {
  loginAdminAction,
  setAdminCredentialsAction,
} from 'actions/loginActions';
import {
  getAdminLoginState,
  getAdminId,
  getAdminPassword,
} from 'reducers/loginReducer';
import {
  getMember,
  isFetched,
} from 'reducers/memberRegistrationReducer';
import {
  USER_TYPES,
} from 'constants/member';
import { getParameterByName } from 'apis/http';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import { getTransformedErrors } from 'utils/form';
import { getConstants } from 'reducers/constants';
import { getLogoPathConfig } from 'reducers/config';

import LoginForm from './LoginForm';
import ImageWrapper from './ImageWrapper';

const ContainerStyled = styled(Container)`
  background-color: ${getThemeProps('home.backgroundColor')};
  height: 100%;
  display: flex;
  ${({ theme }) => theme.media.down('sm')`
      height: auto;
      min-height: 100%;
  `}
  @media (max-width: 992px) and (orientation: landscape) {
      height: auto;
  }
`;

const BoxStyled = styled(Box)`
 align-items: center;
 width: 600px;
 ${({ theme }) => theme.media.down('md')`
     margin: 60px auto auto auto;
     height: 85%;
     width: 97%;
 `};
 ${({ theme }) => theme.media.down('sm')`
     margin: 60px auto;
 `}
 @media (max-width: 992px) and (orientation: landscape) {
     width: 64%;
     margin: 60px auto;
 }
`;

const ImageStyled = styled.img`
  width: 100%;
`;

const TypographyStyled = styled(Typography)`
  color: ${getThemeProps('colors.header')};
`;

/**
 * SplashPage component will be render home page of admin
 * @type {Class}
 */
class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: {},
      adminCredentialErrorMessage: false,
      hasError: false,
      isAdmin: false,
      isNewRegistration: false,
      isURLParams: false,
      redirectToRoute: '',
    };
  }

  /**
   * When member login through URL then this method will
   * get id and secretCode form URL and fetch data of that particular member.
   */
  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secretCode');
    const redirectToRoute = getParameterByName('fromRoute');

    if (redirectToRoute) {
      this.setRedirectToRoute(redirectToRoute);
    }
    if (id && secretCode) {
      this.fetchMemberByURLParams(id, secretCode);
    }
  }

  /**
   * Handle the onChange of admin login form
   * @param {Object} formData
   * @param {Array} errors
   */
  onChange = ({ formData, errors }) => {
    this.setState({
      admin: formData,
      hasError: isEmpty(errors),
      adminCredentialErrorMessage: false,
    });
  };

  /**
   * Method return error message object
   * @param {Array} errors
   * @return {Array}
   */
  transformErrors = (errors) => {
    const { constants } = this.props;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } = constants;

    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
      'enum': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    };

    return getTransformedErrors({ errors, transformErrors });
  };

  /**
   * Method set the path to which redirect
   * @param {String} redirectToRoute
   */
  setRedirectToRoute = (redirectToRoute) => {
    this.setState({
      redirectToRoute,
    });
  };

  /**
   * Method fetch member data.
   * And verify the member credential and if fetch member data is
   * success then it set the value of isURLParams to true.
   * @param {String} id
   * @param {String} secretCode
   */
  fetchMemberByURLParams = (id, secretCode) => {
    const { setMemberCredentials, fetchMemberData } = this.props;
    setMemberCredentials({ id, secretKey: secretCode });
    fetchMemberData({ id, secretKey: secretCode });
    this.setState({
      isURLParams: true,
    });
  };

  /**
   * Method enable the admin login button by onClick of admin login button.
   * It set the value of isAdmin to true.
   */
  enableAdminLoginButtons = () => {
    this.setState({
      isAdmin: true,
    });
  };

  /**
   * Method disable the admin login
   * button by onClick of go back button.
   * It set the value of isAdmin to false.
   */
  handleDisableAdminLoginButtons = () => {
    this.setState({
      isAdmin: false,
    });
  };

  /**
   * Method set the admin login credential
   */
  setAdminLogin = () => {
    const { admin, hasError } = this.state;
    const { setAdminCredentials, loginAdmin } = this.props;
    if (hasError) {
      this.setState({
        adminCredentialErrorMessage: true,
      });
      setAdminCredentials({ id: admin.adminId, password: admin.adminPassword });
      loginAdmin({ adminId: admin.adminId, adminPassword: admin.adminPassword });
    }
  };

  /**
   * Method set the value of isNewRegistration true on Onclick of new registration button.
   */
  redirectToNewRegistrationPage = () => {
    const { setHashLinkForNewRegistration } = this.props;
    const { ADMIN } = USER_TYPES;

    this.setState({
      isNewRegistration: true,
    });
    setHashLinkForNewRegistration(ADMIN);
  };

  render() {
    const {
      admin,
      isAdmin,
      isNewRegistration,
      isURLParams,
    } = this.state;
    const {
      tenant,
      constants,
      logoPathConfig,
    } = this.props;
    const { pageBodyLogo } = logoPathConfig;
    const {
      EVENT_DATE,
      EVENT_VENUE,
    } = constants;

    if (isURLParams) {
      return <Switch><Redirect to="/member-registration-correction" /></Switch>;
    }
    return (
      <ContainerStyled width="100%">
        <BoxStyled
          maxWidth="97%"
          maxHeight="100%"
          margin="auto"
          borderStyle="none"
          elevation={5}
        >
          <Col>
            <Row width="100%" display="inline-block">
              <TypographyStyled
                align="center"
                fontSize="18px"
                fontWeight="600"
                type="title"
              >
                {EVENT_DATE}
              </TypographyStyled>
              <Typography
                align="center"
                fontSize="16px"
                type="title"
              >
                {EVENT_VENUE}
              </Typography>
            </Row>
            <ImageWrapper
              margin="auto"
              padding="20px"
              tagname="div"
              width="50%"
            >
              <ImageStyled src={pageBodyLogo} alt="yjsg logo" />
            </ImageWrapper>
            <LoginForm
              admin={admin}
              enableAdminLoginButtons={this.enableAdminLoginButtons}
              handleDisableAdminLoginButtons={this.handleDisableAdminLoginButtons}
              isAdmin={isAdmin}
              isNewRegistration={isNewRegistration}
              onChange={this.onChange}
              redirectToNewRegistrationPage={this.redirectToNewRegistrationPage}
              setAdminLogin={this.setAdminLogin}
              transformErrors={this.transformErrors}
              adminCredentialErrorMessage={this.state.adminCredentialErrorMessage}
              redirectToRoute={this.state.redirectToRoute}
              id={this.props.id}
              password={this.props.password}
              isAdminLogin={this.props.isAdminLogin}
              setRedirectToRoute={this.setRedirectToRoute}
            />
          </Col>
        </BoxStyled>
      </ContainerStyled>
    );
  }
}

SplashPage.propTypes = {
  constants: PropTypes.object,
  isAdminLogin: PropTypes.bool,
  fetchMemberData: PropTypes.func,
  id: PropTypes.string,
  logoPathConfig: PropTypes.object,
  password: PropTypes.string,
  setAdminCredentials: PropTypes.func,
  setHashLinkForNewRegistration: PropTypes.func,
  setMemberCredentials: PropTypes.func,
  loginAdmin: PropTypes.func,
  tenant: PropTypes.string,
};

SplashPage.defaultProps = {
  constants: {},
  isAdminLogin: false,
  fetchMemberData: () => {},
  logoPathConfig: {},
  id: '',
  password: '',
  setAdminCredentials: () => {},
  setHashLinkForNewRegistration: () => {},
  setMemberCredentials: () => {},
  loginAdmin: () => {},
  tenant: '',
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  id: getAdminId(state),
  isFetched: isFetched(state),
  logoPathConfig: getLogoPathConfig(state),
  password: getAdminPassword(state),
  memberData: getMember(state),
  tenant: getApplicationTenant(state),
  isAdminLogin: getAdminLoginState(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMemberData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  setAdminCredentials: ({ id, password }) => dispatch(setAdminCredentialsAction({ id, password })),
  setHashLinkForNewRegistration: userType => dispatch(setHashLinkForNewRegistrationAction(userType)),
  setMemberCredentials: ({ id, secretKey }) => dispatch(setMemberCredentialsAction({ id, secretKey })),
  loginAdmin: ({ adminId, adminPassword }) => dispatch(loginAdminAction({ adminId, adminPassword })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashPage);
